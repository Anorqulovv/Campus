import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entity/user.entity';
import { CryptoService } from 'src/infrastructure/helpers/Crypto';
import { UserController } from './user.controller';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminController, UserController],
  providers: [UsersService, CryptoService, AuthGuard, RolesGuard],
})
export class UsersModule {}
