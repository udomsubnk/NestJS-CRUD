import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(bodyParser.json());
  await app.listen(3000);
}
bootstrap();
