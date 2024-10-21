import {
  NestFactory,
  BaseExceptionFilter,
  HttpAdapterHost,
} from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { hostname } from 'os';
import 'reflect-metadata';

import { EnvironmentVariables } from 'src/common/validation';
import { AppModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './common/filters';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('NEWS SUBSCRIBER API Documentation')
    .setDescription('PROVIDED APIS FOR NEWS SUBSCRIBER APPLICATION')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

function setupValidationPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );
}

async function createApp() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    forceCloseConnections: true,
    bufferLogs: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('api', {
    exclude: ['api', 'health', 'docs'],
  });
  return app;
}

function setupSentry(app, configService: ConfigService<EnvironmentVariables>) {
  const SENTRY_DSN = configService.get('SENTRY_URL' as const);
  const { httpAdapter } = app.get(HttpAdapterHost);
  Sentry.init({ dsn: SENTRY_DSN });
  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));
}

async function bootstrap() {
  const app = await createApp();

  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  setupValidationPipes(app);
  setupSwagger(app);
  setupSentry(app, configService);

  const PORT = configService.get('PORT');
  const NODE_ENV = configService.get('NODE_ENV');

  await app.listen(PORT);
  console.info(
    `NEWS SUBSCRIBER HAS STARTED AND IT IS LISTENING ON PORT : ${PORT} IN SERVER : ${hostname()} IN THE MODE OF : ${NODE_ENV}`,
  );
}

bootstrap();
