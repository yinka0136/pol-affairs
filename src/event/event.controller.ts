import { EventService } from './event.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetEventFilterDTO } from 'src/Event/dtos/get-Event-dto';
import { Event } from 'src/Event/Event.entity';
import { DeleteResult } from 'typeorm';
import { CreateEventDTO } from './dtos/create-event-dto';
import { PaginatedResultDto } from 'src/shared/dto/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('event')
@ApiTags('events')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class EventController {
  private logger = new Logger();
  constructor(private _eventService: EventService) {}
  @Get('events')
  async getEvents(
    @Query() getEventFilterDTO: GetEventFilterDTO,
  ): Promise<PaginatedResultDto<Event[]>> {
    this.logger.verbose(
      `Getting events with Filter: ${JSON.stringify(getEventFilterDTO)}`,
    );
    return this._eventService.getEvents(getEventFilterDTO);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async createEvent(
    @Body() createEventDTO: CreateEventDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Event> {
    return this._eventService.createEvent(createEventDTO, file);
  }

  @Get('/:id')
  getEventById(@Param('id', ParseIntPipe) eventId: number): Promise<Event> {
    return this._eventService.getEventById(eventId);
  }
  @Delete('/:id')
  deleteEvent(
    @Param('id', ParseIntPipe) eventId: number,
  ): Promise<DeleteResult> {
    return this._eventService.deleteEvent(eventId);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    updateEventDTO: CreateEventDTO,
  ): Promise<Event> {
    return this._eventService.updateEvent(eventId, updateEventDTO, file);
  }
}
