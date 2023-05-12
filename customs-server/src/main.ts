import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.use(cors({
    origin: 'http://localhost:3000', // 允许跨域访问的来源
    allowedHeaders: 'Content-Type, Accept', // 允许的请求头
    methods: 'GET, POST, PUT, DELETE', // 允许的请求方法
  }));
  await app.listen(5000);
}
bootstrap();
