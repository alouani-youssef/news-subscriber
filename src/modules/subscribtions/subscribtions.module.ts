import { Module } from '@nestjs/common';
import { SubscribtionsService } from './subscribtions.service';
import { SubscribtionsController } from './subscribtions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribtions } from './entities';
import { UsersModule } from '../users/users.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribtions]), UsersModule, TransactionsModule],
  providers: [
    SubscribtionsService,
  ],
  controllers: [SubscribtionsController],
  exports: [SubscribtionsService],
})
export class SubscribtionsModule { }
