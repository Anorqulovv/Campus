import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { envConfig } from './config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

export class App {
  static async main() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const PORT = envConfig.PORT || 7000;

    app.setGlobalPrefix('/api');
    app.useStaticAssets('/uploads', {
      prefix: '/api/',
    });

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

    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: false,
    });

    await app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}
