import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // Requisito crítico para Stripe Webhooks
  });

  const configService = app.get(ConfigService);

  // Validación global estricta
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = configService.get('PORT') || 3003;
  await app.listen(port);
  console.log(`Payments Microservice running on port ${port}`);
}
bootstrap();
