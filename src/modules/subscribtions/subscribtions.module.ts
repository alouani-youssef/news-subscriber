import { Module } from '@nestjs/common';
import { SubscribtionsService } from './subscribtions.service';
import { SubscribtionsController } from './subscribtions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribtions } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribtions])],
  providers: [SubscribtionsService],
  controllers: [SubscribtionsController],
  exports: [SubscribtionsService]
})
export class SubscribtionsModule { }
