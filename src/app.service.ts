import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { envConfig } from './config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { join } from 'path';

export class App {
  static async main() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const PORT = envConfig.PORT;

    app.setGlobalPrefix('/api');

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );

    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/',
    });
    app.enableCors({
      origin: '*', 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: false,
    });

    app.use((req, res, next) => {
      if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
      }
      next();
    });

    await app.listen(PORT, () => {
      console.log('server running on port ', PORT);
    });
  }
}
