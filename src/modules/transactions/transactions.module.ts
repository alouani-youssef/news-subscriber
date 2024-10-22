import { Module } from '@nestjs/common';
import { SubscrbtionTransactionsService, UserTransactionsService } from './services';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscrbtionTransaction, UserTransaction } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserTransaction, SubscrbtionTransaction])],
  providers: [UserTransactionsService, SubscrbtionTransactionsService],
  controllers: [TransactionsController],
  exports: [UserTransactionsService, SubscrbtionTransactionsService]
})
export class TransactionsModule { }
