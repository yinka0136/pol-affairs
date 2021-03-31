import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { GalleryModule } from './gallery/gallery.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { NewsArticleModule } from './news-article/news-article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './auth/config/typeorm.config';

@Module({
  imports: [
    EventModule,
    GalleryModule,
    NewsArticleModule,
    SharedModule,
    AuthModule,
    TypeOrmModule.forRoot(TypeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
