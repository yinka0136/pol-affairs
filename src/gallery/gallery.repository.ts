import { CreateGalleryDTO } from './dtos/create-gallery.dto';
import { GetGalleryFilterDTO } from './dtos/get-gallery-dto';
import { EntityRepository, Repository } from 'typeorm';
import { Gallery } from './gallery.entity';
import { User } from 'src/auth/user.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cloudinary } from 'src/utilities/cloudinary';
import { PaginatedResultDto } from 'src/shared/dto/pagination.dto';
@EntityRepository(Gallery)
export class GalleryRepository extends Repository<Gallery> {
  private cloudinary = new Cloudinary();
  private logger = new Logger();
  async createGallery(
    createGalleryDTO: CreateGalleryDTO,
    file: Express.Multer.File,
  ): Promise<Gallery> {
    const { title, description } = createGalleryDTO;
    const gallery = new Gallery();
    (gallery.title = title), (gallery.description = description);
    if (!file) {
      throw new BadRequestException('Please ensure that you select an image');
    }
    const res = await this.cloudinary.upload_image(file);
    if (res == null) {
      throw new BadRequestException(
        'Could not upload file, please check your internet connection',
      );
    } else {
      const { public_id, secure_url } = res;
      gallery.imageUrl = secure_url;
      gallery.image_public_id = public_id;
    }

    try {
      await gallery.save();
      return gallery;
    } catch (error) {
      this.logger.error(`Error occured`, error.stack);
      throw new InternalServerErrorException('An error occured while creating');
    }
  }
  async getGalleries(
    filterDTO: GetGalleryFilterDTO,
  ): Promise<PaginatedResultDto<Gallery[]>> {
    const { search, page, limit } = filterDTO;
    const pagee = page || 1;
    const limitt = limit > 10 ? 10 : limit || 10;
    const skipped = (pagee - 1) * limitt;
    const query = this.createQueryBuilder('gallery');
    if (search) {
      query.andWhere(
        'gallery.title LIKE :search OR gallery.description LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }
    query.orderBy('gallery.id', 'DESC');
    query.offset(skipped);
    query.limit(limitt);
    try {
      const galleries = await query.getManyAndCount();
      return {
        pagination: { page: pagee, limit: limitt, count: galleries[1] },
        data: galleries[0],
      };
    } catch (error) {
      this.logger.error('An error occured while fetching', error.stack);
      throw new InternalServerErrorException('Couldnt fetch galleries');
    }
  }
}
