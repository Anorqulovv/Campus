import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entity/user.entity';
import type { UserRopository } from 'src/core/repository/user.repository';
import { BaseService } from 'src/infrastructure/utils/BaseService';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/enum/userEnum';
import { envConfig } from 'src/config';
import { CryptoService } from 'src/infrastructure/helpers/Crypto';
import { succesRes } from 'src/infrastructure/utils/succes-res';
import { ISucces } from 'src/infrastructure/utils/succes.interface';
import { Not } from 'typeorm';

@Injectable()
export class UsersService
  extends BaseService<CreateUserDto, UpdateUserDto, User>
  implements OnModuleInit
{
  constructor(
    @InjectRepository(User) private readonly userRepo: UserRopository,
    private readonly crypto: CryptoService,
  ) {
    super(userRepo);
  }

  async onModuleInit() {
    const exitsSuperAdmin = await this.getRepository.findOne({
      where: { role: Roles.SUPERADMIN },
    });
    if (!exitsSuperAdmin) {
      const superAdmin = this.getRepository.create({
        username: envConfig.SUPERADMIN.USERNAME,
        password: await this.crypto.hashPassword(envConfig.SUPERADMIN.PASSWORD),
        email: envConfig.SUPERADMIN.EMAIL,
        role: Roles.SUPERADMIN,
      });
      await this.getRepository.save(superAdmin);
    }
  }

  async createUser(dto: CreateUserDto, role: Roles) {
    const { username, email, password } = dto;
    const exitsUsername = await this.getRepository.findOne({
      where: { username },
    });
    if (exitsUsername) {
      throw new ConflictException('username already exits');
    }
    const exitsPhoneNumber = await this.getRepository.findOne({
      where: { email },
    });
    if (exitsPhoneNumber) {
      throw new ConflictException('email already exits');
    }
    const hashPass = await this.crypto.hashPassword(password);
    const user = this.getRepository.create({
      ...dto,
      password: hashPass,
      role,
    });
    await this.getRepository.save(user);
    return succesRes(user, 201);
  }

  async update(id: string, dto: UpdateUserDto): Promise<ISucces> {
    await this.findOneById(id);
    const { username, email, password } = dto;
    const existsUsername = await this.getRepository.findOne({
      where: { username, id: Not(id) },
    });
    if (existsUsername) {
      throw new ConflictException('username already exits');
    }
    const existsPhone = await this.getRepository.findOne({
      where: { email, id: Not(id) },
    });
    if (existsPhone) {
      throw new ConflictException('email already exits');
    }
    const updateData: any = { ...dto };
    if (password) {
      updateData.password = await this.crypto.hashPassword(password);
    }

    await this.getRepository.update(id, dto);
    const data = await this.getRepository.findOne({ where: { id } });
    return succesRes(data);
  }
}
