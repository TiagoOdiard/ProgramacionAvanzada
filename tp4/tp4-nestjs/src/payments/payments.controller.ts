import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  RawBodyRequest,
  BadRequestException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service.ts';
import { CreatePaymentSessionDto } from './dto/create-payment-session.dto.ts';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  createPaymentSession(
    @Body() createPaymentSessionDto: CreatePaymentSessionDto,
  ) {
    return this.paymentsService.createPaymentSession(createPaymentSessionDto);
  }

  @Get('success')
  success() {
    return { ok: true, message: 'Payment successful' };
  }

  @Get('cancel')
  cancel() {
    return { ok: false, message: 'Payment cancelled' };
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: RawBodyRequest,
    @Headers('stripe-signature') signature: string,
  ) {
    if (!signature) {
      throw new BadRequestException('Falta la cabecera stripe-signature');
    }

    if (!req.rawBody) {
      throw new BadRequestException(
        'No se recibió el cuerpo sin procesar (rawBody)',
      );
    }

    return this.paymentsService.handleWebhook(req.rawBody, signature);
  }
}
