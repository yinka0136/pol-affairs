import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from './../auth/auth.module';
import { GalleryService } from './gallery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryRepository } from './gallery.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GalleryRepository]),
    AuthModule,
    SharedModule,
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
