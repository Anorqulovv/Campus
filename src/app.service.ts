import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { envConfig } from './config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { join } from 'path';

export class App {
  static async main() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const PORT = envConfig.PORT || 7000;

    app.setGlobalPrefix('/api');
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
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

    app.use((req, res, next) => {
      if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
      }
      next();
    });

    await app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Static files are served from: ${join(__dirname, '..', 'uploads')}`);
    });
  }
}