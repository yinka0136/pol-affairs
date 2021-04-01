import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventRepository } from './event.repository';
import { DeleteResult } from 'typeorm';
import { CreateEventDTO } from './dtos/create-event-dto';
import { GetEventFilterDTO } from './dtos/get-event-dto';
import { Event } from './event.entity';
import { Cloudinary } from 'src/utilities/cloudinary';
import { PaginatedResultDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class EventService {
  private cloudinary = new Cloudinary();
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}
  async createEvent(
    createEventDTO: CreateEventDTO,
    file: Express.Multer.File,
  ): Promise<Event> {
    return this.eventRepository.createEvent(createEventDTO, file);
  }
  async getEvents(
    getEventFilterDTO: GetEventFilterDTO,
  ): Promise<PaginatedResultDto<Event[]>> {
    return this.eventRepository.getEvents(getEventFilterDTO);
  }

  async getEventById(eventId: number): Promise<Event> {
    const found = await this.eventRepository.findOne({
      where: { id: eventId },
    });
    if (!found)
      throw new NotFoundException(`No Event with id ${eventId} found`);
    return found;
  }
  async deleteEvent(eventId: number): Promise<DeleteResult> {
    const affected: DeleteResult = await this.eventRepository.delete({
      id: eventId,
    });
    if (affected.affected === 0) {
      throw new NotFoundException(`No Event with id ${eventId} found`);
    }
    return affected.raw;
  }
  async updateEvent(
    eventId: number,
    updateEventDTO: CreateEventDTO,
    file: Express.Multer.File,
  ): Promise<Event> {
    const existingEvent = await this.getEventById(eventId);
    updateEventDTO.title == null
      ? null
      : (existingEvent.title = updateEventDTO.title);
    updateEventDTO.detail == null
      ? null
      : (existingEvent.detail = updateEventDTO.detail);
    updateEventDTO.publishDate == null
      ? null
      : (existingEvent.publishDate = updateEventDTO.publishDate);

    if (file) {
      const res = await this.cloudinary.upload_image(file);
      if (res == null) {
        throw new BadRequestException(
          'Could not upload file, please check your internet connection',
        );
      } else {
        const { secure_url } = res;
        existingEvent.image = secure_url;
      }
    }

    await existingEvent.save();
    return existingEvent;
  }
}
