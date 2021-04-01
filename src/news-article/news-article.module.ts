import { NewsArticleRepository } from './news-article.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NewsArticleController } from './news-article.controller';
import { NewsArticleService } from './news-article.service';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsArticleRepository]),
    AuthModule,
    SharedModule,
  ],
  controllers: [NewsArticleController],
  providers: [NewsArticleService],
})
export class NewsArticleModule {}
