import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubscrbtionTransaction } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { createSubscrbtionTransactionDTO } from 'src/common/types';
import { User } from '../../users/entities';
import { Subscribtions } from 'src/modules/subscribtions/entities';

@Injectable()
export class SubscrbtionTransactionsService {
    private readonly logger: Logger;

    constructor(
        @InjectRepository(SubscrbtionTransaction)
        private readonly TransactionRepository: Repository<SubscrbtionTransaction>,
    ) { }

    create(event: createSubscrbtionTransactionDTO, user: User, subscribtion: Subscribtions) {
        try {
            const transactionWrap = this.TransactionRepository.create({
                user,
                subscribtion,
                ...event
            });
            return this.TransactionRepository.save(transactionWrap);
        } catch (error) {
            this.logger.fatal(`FAILD TO GENERATE TRANSACTION LOG WITH ERROR ${JSON.stringify(error)}`);
        }
    }
}
