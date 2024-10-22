import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserTransaction } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserTransactionDTO } from 'src/common/types';
import { User } from '../../users/entities';

@Injectable()
export class UserTransactionsService {
    private readonly logger: Logger;

    constructor(
        @InjectRepository(UserTransaction)
        private readonly TransactionRepository: Repository<UserTransaction>,
    ) { }

    create(event: createUserTransactionDTO, user: User) {
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
