import { Repository } from 'typeorm';
import { succesRes } from './succes-res';
import { IFindOptions, IResponsePagination, ISucces } from './succes.interface';
import { RepositoryPager } from '../pagination';
import { HttpException } from '@nestjs/common';

export class BaseService<CreateDto, UpdateDto, Entity> {
  constructor(private readonly repository: Repository<any>) {}

  get getRepository() {
    return this.repository;
  }

  async create(dto: CreateDto): Promise<ISucces> {
    let data = this.repository.create({
      ...dto,
    }) as any as Entity;

    data = await this.repository.save(data);
    return succesRes(data, 201);
  }

  async findAll(options?: IFindOptions<Entity>): Promise<ISucces> {
    const data = (await this.repository.find({
      ...options,
    })) as Entity[];
    return succesRes(data);
  }

  async findAllWithPagination(
    options?: IFindOptions<Entity>,
  ): Promise<IResponsePagination> {
    return await RepositoryPager.findAll(this.getRepository, options);
  }

  async findOneBy(options: IFindOptions<Entity>): Promise<ISucces> {
    const data = (await this.repository.findOne({
      select: options.select || {},
      relations: options.relations || [],
      where: options.where,
    })) as Entity;
    if (!data) {
      throw new HttpException('not found', 404);
    }
    return succesRes(data);
  }

  async findOneById(
    id: string,
    options?: IFindOptions<Entity>,
  ): Promise<ISucces> {
    const data = (await this.repository.findOne({
      select: options?.select || {},
      relations: options?.relations || [],
      where: { id, ...options?.where },
    })) as unknown as Entity;

    if (!data) {
      throw new HttpException('not found', 404);
    }
    return succesRes(data);
  }

  async update(id: string, dto: UpdateDto): Promise<ISucces> {
    await this.findOneById(id);
    await this.repository.update(id, dto as any);
    const data = await this.repository.findOne({ where: { id } });
    return succesRes(data);
  }

  async delete(id: string): Promise<ISucces> {
    await this.findOneById(id);
    await this.repository.delete(id);
    return succesRes({ message: 'Successfully deleted' });
  }
}
