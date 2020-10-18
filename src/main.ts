import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import {NestExpressApplication} from '@nestjs/platform-express';
import { ResponseInterceptor } from './common/interceptors/response.interseptor';
import { EnvironmentsService } from './environments/environments.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();

  // Interceptor Response
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Config
  const envService = app.get(EnvironmentsService);
  const port = envService.NODE_PORT;

  // Documentation
  const options = new DocumentBuilder()
    .setTitle('Ancasti-API')
    .setDescription('Documentacion de Ancasti-API de PensarSoft')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(port);
}
bootstrap();
