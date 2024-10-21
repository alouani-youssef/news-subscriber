import { Injectable, Logger } from '@nestjs/common';
import { CreateDto } from './dtos/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils';
import { USERS } from 'src/common/constants';
import { AuthenticationService } from '../authentication/authentication.service';
import { TransactionsService } from '../transactions/transactions.service';
import { RequestTraceType, TransactionTypes } from 'src/common/types';

@Injectable()
export class UsersService {
    private readonly logger: Logger;
    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
        private readonly authenticationService: AuthenticationService,
        private readonly transactionService: TransactionsService,
    ) {
        this.logger = new Logger(UsersService.name);
    }
    async create(payload: CreateDto, trace: RequestTraceType) {
        this.logger.debug(`CREATING USER WITH DATA ${JSON.stringify(payload)}`);
        const allowToCreate = await this.isAllowToCreateUser(payload.username, payload.email);
        if (allowToCreate) {
            const { salt, hash } = await hashPassword(payload.passowrd);
            const userWrap = this.UserRepository.create({
                ...payload,
                is_active: false,
                is_deleted: false,
                is_email_confirmed: false,
                subscribtion_topics_number: 0,
                max_subscribtion: USERS.MAX_SUBSCRIBTIONS,
                hash,
                salt
            });
            const user = await this.UserRepository.save(userWrap);
            const operation = {
                type: TransactionTypes.CREATE_USER,
                address_ip: trace.ip,
                country: trace.country,
                city: trace.city,
                region: trace.region,
                user_agent: trace.userAgent
            }
            await this.transactionService.create(operation, user);
            return user;
        } else {
            throw new Error(`CAN NOT CREATE DUPLICATED ACCOUNTS`);
        }

    }
    async isAllowToCreateUser(username: string, email: string): Promise<boolean> {
        const userWithSameUsernameOrEmail = await this.UserRepository.countBy([{
            username
        }, { email }]);
        if (userWithSameUsernameOrEmail) {
            return !userWithSameUsernameOrEmail;
        } else {
            return true;
        }
    }

    async validateAccountURL() {

    }
}
