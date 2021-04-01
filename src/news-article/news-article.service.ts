import { GetNewsArticleFilterDTO } from './dtos/get-news-article-dto';

import { NewsArticleRepository } from './news-article.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewsArticleDTO } from './dtos/create-news-article.dto';
import { NewsArticle } from './news-article.entity';
import { DeleteResult } from 'typeorm';
import { Cloudinary } from 'src/utilities/cloudinary';
import { PaginatedResultDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class NewsArticleService {
  private cloudinary = new Cloudinary();
  constructor(private repositiory: NewsArticleRepository) {}
  async createNewsArticle(
    createNewsArticleDTO: CreateNewsArticleDTO,
    file: Express.Multer.File,
  ): Promise<NewsArticle> {
    return this.repositiory.createNewsArticle(createNewsArticleDTO, file);
  }
  async getNewsArticles(
    getNewsArticleFilter: GetNewsArticleFilterDTO,
  ): Promise<PaginatedResultDto<NewsArticle[]>> {
    return this.repositiory.getNewsArticles(getNewsArticleFilter);
  }

  async getNewsArticleById(articleIdId: number): Promise<NewsArticle> {
    const found = await this.repositiory.findOne({
      where: { id: articleIdId },
    });
    if (!found)
      throw new NotFoundException(`No Article with id ${articleIdId} found`);
    return found;
  }
  async deleteNewsArticle(articleIdId: number): Promise<DeleteResult> {
    const affected: DeleteResult = await this.repositiory.delete({
      id: articleIdId,
    });
    if (affected.affected === 0) {
      throw new NotFoundException(`No Article with id ${articleIdId} found`);
    }
    return affected.raw;
  }
  async updaterticle(
    articleIdId: number,
    updateNewsArticleDTO: CreateNewsArticleDTO,
    file: Express.Multer.File,
  ): Promise<NewsArticle> {
    const existingArticle = await this.getNewsArticleById(articleIdId);
    updateNewsArticleDTO.title == null
      ? null
      : (existingArticle.title = updateNewsArticleDTO.title);
    updateNewsArticleDTO.fullArticle == null
      ? null
      : (existingArticle.full_article = updateNewsArticleDTO.fullArticle);
    updateNewsArticleDTO.datePublished == null
      ? null
      : (existingArticle.date_published = updateNewsArticleDTO.datePublished);

    if (file) {
      const res = await this.cloudinary.upload_image(file);
      if (res == null) {
        throw new BadRequestException(
          'Could not upload file, please check your internet connection',
        );
      } else {
        const { secure_url } = res;
        existingArticle.preview_imageUrl = secure_url;
      }
    }

    await existingArticle.save();
    return existingArticle;
  }
}
