import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { SingInDto } from './dto/sing-in';
import { User } from 'src/core/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/infrastructure/helpers/Crypto';
import { TokenService } from 'src/infrastructure/helpers/Token';
import { succesRes } from 'src/infrastructure/utils/succes-res';
import { SingUpDto } from './dto/sing-up';
import { Roles } from 'src/common/enum/userEnum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly crypto: CryptoService,
    private readonly token: TokenService,
  ) {}

  async signup(dto: SingUpDto) {
    const { username, phoneNumber, password } = dto;

    const existsUsername = await this.userRepo.findOne({
      where: { username },
    });
    if (existsUsername) {
      throw new ConflictException('Username already exists');
    }

    const existsPhone = await this.userRepo.findOne({
      where: { phoneNumber },
    });
    if (existsPhone) {
      throw new ConflictException('Phone number already exists');
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
      isActive: user.isActive 
    };
    const generatedToken = await this.token.generate(payload);

    return succesRes(
      {
        user: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          age: user.age,
          role: user.role,
        },
        token: generatedToken,
      },
      201,
    );
  }

  async signIn(dto: SingInDto) {
    const { username, password } = dto;
    
    const user = await this.userRepo.findOne({ where: { username } });
    
    if (!user) {
      throw new BadRequestException('Username or password invalid');
    }

    const isMatchPass = await this.crypto.comparePassword(
      password,
      user.password,
    );
    
    if (!isMatchPass) {
      throw new BadRequestException('Username or password invalid');
    }

    const payload = { 
      id: user.id, 
      role: user.role, 
      isActive: user.isActive 
    };
    const generatedToken = await this.token.generate(payload);

    const { password: _, ...userWithoutPassword } = user;

    return succesRes({
      token: generatedToken,
      user: userWithoutPassword,
    });
  }
}