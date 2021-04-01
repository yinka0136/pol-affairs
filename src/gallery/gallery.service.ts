import { GetGalleryFilterDTO } from './dtos/get-gallery-dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './gallery.entity';
import { GalleryRepository } from './gallery.repository';
import { DeleteResult } from 'typeorm';
import { CreateGalleryDTO } from './dtos/create-gallery.dto';
import { Cloudinary } from 'src/utilities/cloudinary';
import { PaginatedResultDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class GalleryService {
  private cloudinary = new Cloudinary();
  GalleryRepository: any;
  constructor(
    @InjectRepository(GalleryRepository)
    private galleryRepository: GalleryRepository,
  ) {}

  async createGallery(
    createGalleryDTO: CreateGalleryDTO,
    file: Express.Multer.File,
  ): Promise<Gallery> {
    return this.galleryRepository.createGallery(createGalleryDTO, file);
  }
  async getGalleries(
    getGalleryFilterDTO: GetGalleryFilterDTO,
  ): Promise<PaginatedResultDto<Gallery[]>> {
    return this.galleryRepository.getGalleries(getGalleryFilterDTO);
  }

  async getGalleryById(galleryId: number): Promise<Gallery> {
    const found = await this.galleryRepository.findOne({
      where: { id: galleryId },
    });
    if (!found)
      throw new NotFoundException(`No Gallery with id ${galleryId} found`);
    return found;
  }
  async deleteGallery(galleryId: number): Promise<DeleteResult> {
    const affected: DeleteResult = await this.galleryRepository.delete({
      id: galleryId,
    });
    if (affected.affected === 0) {
      throw new NotFoundException(`No Gallery with id ${galleryId} found`);
    }
    return affected.raw;
  }
  async updateGallery(
    galleryId: number,
    updateGalleryDTO: CreateGalleryDTO,
    file: Express.Multer.File,
  ): Promise<Gallery> {
    console.log(updateGalleryDTO);
    const existingGallery = await this.getGalleryById(galleryId);
    updateGalleryDTO.title == null
      ? null
      : (existingGallery.title = updateGalleryDTO.title);
    updateGalleryDTO.description == null
      ? null
      : (existingGallery.description = updateGalleryDTO.description);

    if (file) {
      const res = await this.cloudinary.upload_image(file);
      if (res == null) {
        throw new BadRequestException(
          'Could not upload file, please check your internet connection',
        );
      } else {
        const { public_id, secure_url } = res;
        existingGallery.imageUrl = secure_url;
        existingGallery.image_public_id = public_id;
      }
    }

    await existingGallery.save();
    return existingGallery;
  }
}
