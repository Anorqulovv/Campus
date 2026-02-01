import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/infrastructure/utils/BaseService';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from 'src/core/entity/event.entity';
import { FileService } from 'src/infrastructure/file/File.service';
import { succesRes } from 'src/infrastructure/utils/succes-res';
import { ISucces } from 'src/infrastructure/utils/succes.interface';

@Injectable()
export class EventsService extends BaseService<
  CreateEventDto,
  UpdateEventDto,
  Event
> {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    private readonly fileService: FileService,
  ) {
    super(eventRepo);
  }

  async createEvent(
    dto: CreateEventDto,
    file: Express.Multer.File,
  ): Promise<ISucces> {
    const imagePath = await this.fileService.create(file);

    const event = this.getRepository.create({
      ...dto,
      image: imagePath,
    });

    await this.getRepository.save(event);
    return succesRes(event, 201);
  }

  async updateEvents(
    id: string,
    updateEventDto: UpdateEventDto,
    file?: Express.Multer.File,
  ): Promise<ISucces> {
    const event = await this.getRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    let imagePath = event.image;
    if (file) {
      if (event.image) {
        await this.fileService.delete(event.image);
      }

      imagePath = await this.fileService.create(file);
    }

    const updateData = {
      ...updateEventDto,
      image: imagePath,
    };

    await this.getRepository.update(id, updateData);

    const updatedEvent = await this.getRepository.findOne({ where: { id } });
    return succesRes(updatedEvent);
  }

  async delete(id: string): Promise<ISucces> {
    const event = await this.getRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    if (event.image) {
      await this.fileService.delete(event.image);
    }

    await this.getRepository.delete(id);
    return succesRes({ message: 'Event deleted successfully' });
  }
}
