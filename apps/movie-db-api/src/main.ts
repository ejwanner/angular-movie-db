/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from "body-parser";
import * as express from 'express';
import * as path from 'path';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use('/images', express.static(path.join('src/app/images')))
  app.enableCors({
    origin: "*",
    methods: 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    credentials: true,
  })
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/');
  });
}

bootstrap();
