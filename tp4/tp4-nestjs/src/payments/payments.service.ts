import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentSessionDto } from './dto/create-payment-session.dto.ts';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private readonly configService: ConfigService) {
    const stripeSecret = this.configService.get('STRIPE_SECRET');
    if (!stripeSecret) {
      throw new Error(
        'STRIPE_SECRET no está configurada en las variables de entorno',
      );
    }

    this.stripe = new Stripe(stripeSecret, {
      apiVersion: '2025-02-24' as any,
    });
  }

  async createPaymentSession(createPaymentSessionDto: CreatePaymentSessionDto) {
    const { orderId, currency, items } = createPaymentSessionDto;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Conversión a centavos
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: this.configService.get('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.get('STRIPE_CANCEL_URL'),
      payment_intent_data: {
        metadata: {
          orderId: orderId, // orderId se guarda en la metadata del PaymentIntent
        },
      },
    });

    return {
      id: session.id,
      url: session.url,
    };
  }

  handleWebhook(rawBody: Buffer, signature: string) {
    const endpointSecret = this.configService.get('STRIPE_ENDPOINT_SECRET');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret,
      );
    } catch (err: any) {
      this.logger.error(
        `Error en la verificación de firma del webhook: ${err.message}`,
      );
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge;
        // In Stripe API versions, metadata comes from charge or payment_intent
        const orderId = charge.metadata?.orderId;
        this.logger.log(`Pago recibido exitosamente para la orden: ${orderId}`);
        break;
      }
      default:
        this.logger.log(`Evento no manejado: ${event.type}`);
    }

    return { received: true };
  }
}
