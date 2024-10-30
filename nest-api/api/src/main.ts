import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodExceptionFilter } from './customExceptions/ZodErrorHandler';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new ZodExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('HEALTH-APP Api Documentation')
    .setDescription('The api Swagger endpoints documentation')
    .setVersion('1.0')
    .addBearerAuth()
    // .addTag('health-app')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, documentFactory);
  await app.listen(3333);
}
bootstrap();
