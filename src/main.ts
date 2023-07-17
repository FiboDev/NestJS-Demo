import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from "morgan"
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'))
  app.enableCors(CORS)

  app.useGlobalPipes(new ValidationPipe({

    transformOptions: {

      enableImplicitConversion: true

        }
      }
    )
  )

  const configService = app.get(ConfigService)

  app.setGlobalPrefix("v1")

  await app.listen(configService.get("PORT"));
  console.log(`Application running on: ${await app.getUrl()}`)
}
bootstrap();
