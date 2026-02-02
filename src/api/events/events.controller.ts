import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/role.guard';
import { AccessRoles } from '../decorator/Roles.decorator';
import { Roles } from 'src/common/enum/userEnum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createEvent(
    @Body() dto: CreateEventDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.eventsService.createEvent(dto, file);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOneById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const data = updateEventDto.maxParticipants
      ? {
          ...updateEventDto,
          maxParticipants: Number(updateEventDto.maxParticipants),
        }
      : updateEventDto;

    return this.eventsService.updateEvents(id, data, file);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}
