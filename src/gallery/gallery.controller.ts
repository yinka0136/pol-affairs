import { CreateGalleryDTO } from './dtos/create-gallery.dto';
import { Gallery } from './gallery.entity';
import { GetGalleryFilterDTO } from './dtos/get-gallery-dto';
import { GalleryService } from './gallery.service';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginatedResultDto } from 'src/shared/dto/pagination.dto';

@Controller('gallery')
@ApiTags('gallery')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class GalleryController {
  private logger = new Logger();
  constructor(private _galleryService: GalleryService) {}
  @Get()
  async getGalleries(
    @Query() getGalleryFilterDTO: GetGalleryFilterDTO,
  ): Promise<PaginatedResultDto<Gallery[]>> {
    this.logger.verbose(
      `Getting galleries with Filter: ${JSON.stringify(getGalleryFilterDTO)}`,
    );
    return this._galleryService.getGalleries(getGalleryFilterDTO);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async createGallery(
    @Body() createGalleryDTO: CreateGalleryDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Gallery> {
    return this._galleryService.createGallery(createGalleryDTO, file);
  }

  @Get('/:id')
  getGalleryById(
    @Param('id', ParseIntPipe) galleryId: number,
  ): Promise<Gallery> {
    return this._galleryService.getGalleryById(galleryId);
  }
  @Delete('/:id')
  deleteGallery(
    @Param('id', ParseIntPipe) galleryId: number,
  ): Promise<DeleteResult> {
    return this._galleryService.deleteGallery(galleryId);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateGallery(
    @Param('id', ParseIntPipe) galleryId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    updateGalleryDTO: CreateGalleryDTO,
  ): Promise<Gallery> {
    return this._galleryService.updateGallery(
      galleryId,
      updateGalleryDTO,
      file,
    );
  }
}
