import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entity/user.entity';
import { CryptoService } from 'src/infrastructure/helpers/Crypto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/infrastructure/helpers/Token';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CryptoService, JwtService, TokenService],
})
export class AuthModule {}
