import { Module } from '@nestjs/common';
import { NewsArticleController } from './news-article.controller';

@Module({
  controllers: [NewsArticleController]
})
export class NewsArticleModule {}
