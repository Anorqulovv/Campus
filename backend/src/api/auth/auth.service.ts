import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SingInDto } from './dto/sing-in';
import { SingUpDto } from './dto/sing-up';

import { User } from 'src/core/entity/user.entity';
import { Roles } from 'src/common/enum/userEnum';

import { CryptoService } from 'src/infrastructure/helpers/Crypto';
import { TokenService } from 'src/infrastructure/helpers/Token';

import { succesRes } from 'src/infrastructure/utils/succes-res';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly crypto: CryptoService,
    private readonly token: TokenService,
  ) {}

  async signup(dto: SingUpDto) {
    const { username, email, password } = dto;

    const existsUsername = await this.userRepo.findOne({
      where: { username },
    });
    if (existsUsername) {
      throw new ConflictException('Username already exists');
    }

    const existsPhone = await this.userRepo.findOne({
      where: { email },
    });
    if (existsPhone) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.crypto.hashPassword(password);

    const user = this.userRepo.create({
      ...dto,
      password: hashedPassword,
      role: Roles.VIEWER,
    });

    await this.userRepo.save(user);

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      isActive: user.isActive,
    };

    const token = await this.token.generate(payload);

    return succesRes(
      {
        user: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          phoneNumber: user.email,
          age: user.age,
          role: user.role,
        },
        token,
      },
      201,
    );
  }

  async signIn(dto: SingInDto) {
    const { username, password } = dto;

    const user = await this.userRepo.findOne({
      where: { username },
    });

    if (!user) {
      throw new BadRequestException('Username or password invalid');
    }

    const isMatch = await this.crypto.comparePassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Username or password invalid');
    }

    const payload = {
      id: user.id,
      role: user.role,
      isActive: user.isActive,
    };

    const token = await this.token.generate(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return succesRes({
      token,
      user: userWithoutPassword,
    });
  }
}
