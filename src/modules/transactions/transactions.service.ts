import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { createTransactionDTO } from 'src/common/types';
import { User } from '../users/entities';

@Injectable()
export class TransactionsService {
    private readonly logger: Logger;

    constructor(
        @InjectRepository(Transaction)
        private readonly TransactionRepository: Repository<Transaction>,
    ) { }

    create(event: createTransactionDTO, user: User) {
        try {
            const transactionWrap = this.TransactionRepository.create({
                user,
                ...event
            });
            return this.TransactionRepository.save(transactionWrap);
        } catch (error) {
            this.logger.fatal(`FAILD TO GENERATE TRANSACTION LOG WITH ERROR ${JSON.stringify(error)}`);
        }
    }
}
