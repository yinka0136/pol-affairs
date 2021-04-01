import { EventRepository } from './event.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EntityRepository } from 'typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRepository]),
    AuthModule,
    SharedModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
