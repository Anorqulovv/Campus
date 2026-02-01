import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { envConfig } from './config';
import { UsersModule } from './api/users/users.module';
import { EventsModule } from './api/events/events.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envConfig.DB_URL,
      synchronize: true,
      autoLoadEntities: true,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', envConfig.UPLOAD_PATH),
      serveRoot: `/api/${envConfig.UPLOAD_PATH}`,
    }),
    UsersModule,
    EventsModule,
    AuthModule,
  ],
})
export class AppModule {}
