import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from 'src/core/entity/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from 'src/infrastructure/file/File.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService, FileService],
})
export class EventsModule {}
