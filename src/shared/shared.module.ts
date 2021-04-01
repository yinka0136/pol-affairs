import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SharedController } from './shared.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [SharedController],
  exports: [MulterModule],
})
export class SharedModule {}
