import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/payment-session.dto';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const stripeSecret = this.configService.get('STRIPE_SECRET');
    if (!stripeSecret) {
      throw new Error('STRIPE_SECRET environment variable is missing!');
    }
    this.stripe = new Stripe(stripeSecret);
  }

  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { orderId, currency, items } = paymentSessionDto;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      payment_intent_data: {
        metadata: {
          orderId: orderId,
        },
      },
      success_url: this.configService.get('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.get('STRIPE_CANCEL_URL'),
    });

    return {
      id: session.id,
      url: session.url,
    };
  }

  async handleWebhook(signature: string, rawBody: Buffer) {
    const endpointSecret = this.configService.get('STRIPE_ENDPOINT_SECRET');

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret,
      );
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Webhook Error: ${err.message}`);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge;

        // Extraer el orderId guardado en la metadata de la transacción
        const orderId = charge.metadata?.orderId;

        console.log(' PAGO ACREDITADO CON ÉXITO');
        console.log(` Order ID: ${orderId}`);
        break;
      }

      // Opcional: puedes dejar payment_intent.succeeded si también quieres capturarlo
      case 'payment_intent.succeeded': {
        console.log('PaymentIntent exitoso recibido');
        break;
      }

      default:
        console.log(`Evento no manejado: ${event.type}`);
    }

    return { received: true };
  }
}
