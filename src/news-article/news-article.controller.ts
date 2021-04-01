import { CreateNewsArticleDTO } from './dtos/create-news-article.dto';
import { GetNewsArticleFilterDTO } from './dtos/get-news-article-dto';
import { NewsArticleService } from './news-article.service';
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
import { DeleteResult } from 'typeorm';
import { NewsArticle } from './news-article.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginatedResultDto } from 'src/shared/dto/pagination.dto';

@Controller('article')
@ApiBearerAuth()
@ApiTags('article')
@UseGuards(AuthGuard())
export class NewsArticleController {
  private logger = new Logger();
  constructor(private _newsArticleService: NewsArticleService) {}
  @Get('articles')
  async getEventArticles(
    @Query() getNewsArticleFilterDTO: GetNewsArticleFilterDTO,
  ): Promise<PaginatedResultDto<NewsArticle[]>> {
    this.logger.verbose(
      `Getting NewsArticles with Filter: ${JSON.stringify(
        getNewsArticleFilterDTO,
      )}`,
    );
    return this._newsArticleService.getNewsArticles(getNewsArticleFilterDTO);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  async createWallet(
    @Body() createNewsArticleDTO: CreateNewsArticleDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<NewsArticle> {
    return this._newsArticleService.createNewsArticle(
      createNewsArticleDTO,
      file,
    );
  }

  @Get('/:id')
  getEventById(
    @Param('id', ParseIntPipe) articleId: number,
  ): Promise<NewsArticle> {
    return this._newsArticleService.getNewsArticleById(articleId);
  }
  @Delete('/:id')
  deleteEvent(
    @Param('id', ParseIntPipe) articleId: number,
  ): Promise<DeleteResult> {
    return this._newsArticleService.deleteNewsArticle(articleId);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateEvent(
    @Param('id', ParseIntPipe) articleId: number,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    updateNewsArticleDTO: CreateNewsArticleDTO,
  ): Promise<NewsArticle> {
    return this._newsArticleService.updaterticle(
      articleId,
      updateNewsArticleDTO,
      file,
    );
  }
}
