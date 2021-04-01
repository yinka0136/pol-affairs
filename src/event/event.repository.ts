import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cloudinary } from 'src/utilities/cloudinary';
import { EntityRepository, Repository } from 'typeorm';
import { CreateEventDTO } from './dtos/create-event-dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { GetEventFilterDTO } from './dtos/get-event-dto';
import { Event } from './event.entity';
import { PaginatedResultDto } from 'src/shared/dto/pagination.dto';
@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  private cloudinary = new Cloudinary();
  private logger = new Logger();
  async createEvent(
    createEventDTO: CreateEventDTO,
    file: Express.Multer.File,
  ): Promise<Event> {
    const { title, detail, publishDate } = createEventDTO;
    const event = new Event();
    (event.title = title),
      (event.detail = detail),
      (event.publishDate = publishDate);
    if (!file) {
      throw new BadRequestException('Please ensure that you select an image');
    }
    const res = await this.cloudinary.upload_image(file);
    if (res == null) {
      throw new BadRequestException(
        'Could not upload file, please check your internet connection',
      );
    } else {
      const { secure_url } = res;
      event.image = secure_url;
    }

    try {
      await event.save();
      return event;
    } catch (error) {
      this.logger.error(`Error occured`, error.stack);
      throw new InternalServerErrorException('An error occured while creating');
    }
  }
  async getEvents(
    filterDTO: GetEventFilterDTO,
  ): Promise<PaginatedResultDto<Event[]>> {
    const { search, page, limit } = filterDTO;
    const pagee = page || 1;
    const limitt = limit > 10 ? 10 : limit || 10;
    const skipped = (pagee - 1) * limitt;
    const query = await this.createQueryBuilder('event');
    if (search) {
      query.andWhere('event.title LIKE :search OR event.detail LIKE :search', {
        search: `%${search}%`,
      });
    }
    query.orderBy('event.id', 'DESC');
    query.offset(skipped);
    query.limit(limitt);
    try {
      const events = await query.getManyAndCount();
      return {
        pagination: { page: pagee, limit: limitt, count: events[1] },
        data: events[0],
      };
    } catch (error) {
      this.logger.error('An error occured while fetching', error.stack);
      throw new InternalServerErrorException('Couldnt fetch events');
    }
  }
}
