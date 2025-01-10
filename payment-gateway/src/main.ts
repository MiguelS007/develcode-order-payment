import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.text({ limit: '5mb' }));

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('My App')
    .setDescription('The description of my app')
    .setVersion('1.0')
    .addTag('my-app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
