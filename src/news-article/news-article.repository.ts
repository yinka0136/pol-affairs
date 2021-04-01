import { NewsArticle } from './news-article.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cloudinary } from 'src/utilities/cloudinary';
import { CreateNewsArticleDTO } from './dtos/create-news-article.dto';
import { GetNewsArticleFilterDTO } from './dtos/get-news-article-dto';
import { PaginatedResultDto } from 'src/shared/dto/pagination.dto';
@EntityRepository(NewsArticle)
export class NewsArticleRepository extends Repository<NewsArticle> {
  private cloudinary = new Cloudinary();
  private logger = new Logger();
  async createNewsArticle(
    createNewsArticleDTO: CreateNewsArticleDTO,
    file: Express.Multer.File,
  ): Promise<NewsArticle> {
    const { title, datePublished, fullArticle } = createNewsArticleDTO;
    const newsArticle = new NewsArticle();
    (newsArticle.title = title),
      (newsArticle.date_published = datePublished),
      (newsArticle.full_article = fullArticle);
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
      newsArticle.preview_imageUrl = secure_url;
    }

    try {
      await newsArticle.save();
      return newsArticle;
    } catch (error) {
      this.logger.error(`Error occured`, error.stack);
      throw new InternalServerErrorException('An error occured while creating');
    }
  }
  async getNewsArticles(
    filterDTO: GetNewsArticleFilterDTO,
  ): Promise<PaginatedResultDto<NewsArticle[]>> {
    const { search, page, limit } = filterDTO;
    const pagee = page || 1;
    const limitt = limit > 10 ? 10 : limit || 10;
    const skipped = (pagee - 1) * limitt;
    const query = this.createQueryBuilder('newsArticle');
    if (search) {
      query.andWhere(
        'newsArticle.title LIKE :search OR newsArticle.full_article LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }
    try {
      const articles = await query.getManyAndCount();
      return {
        pagination: { page: pagee, limit: limitt, count: articles[1] },
        data: articles[0],
      };
    } catch (error) {
      this.logger.error('An error occured while fetching', error.stack);
      throw new InternalServerErrorException('Couldnt fetch articles');
    }
  }
}
