import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.ts';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // Requerido para verificar la firma del webhook de Stripe
  });

  const configService = app.get(ConfigService);
  const logger = new Logger('Main');

  // Configuración del ValidationPipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = configService.get('PORT') || 3003;
  await app.listen(port);
  logger.log(`Payments MS escuchando en el puerto ${port}`);
}
bootstrap();
