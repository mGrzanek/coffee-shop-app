import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : true,
    credentials: true,
  });
  app.use(cookieParser());
  app.use('/images', express.static(join(__dirname, '..', 'public/images')));
  await app.enableShutdownHooks();
  await app.listen(configService.get('port'));
}
bootstrap();
