import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthenticationService } from 'src/modules/authentication/authentication.service';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { RequestTraceType, UserOperationTypes } from 'src/common/types';
import { EnvironmentVariables } from 'src/common/validation';
import { decrypt, encrypt, hashPassword, verifyPassword } from 'src/utils';
import { USERS } from 'src/common/constants';
import { CreateDto } from './dtos/create.dto';
import { User } from './entities';


@Injectable()
export class UsersService {
    private readonly logger: Logger;
    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
        private readonly authenticationService: AuthenticationService,
        private readonly transactionService: TransactionsService,
        private readonly configService: ConfigService<EnvironmentVariables>
    ) {
        this.logger = new Logger(UsersService.name);
    }
    /**
     * @function create
     * @description Create a new user.
     * @param payload - The user data, must adhere to the `CreateDto` type.
     * @param trace - The request trace, contains information about the request.
     * @returns The created user.
     * @throws If the user already exists.
     */
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
            await this.createUserOperation(user, trace);
            this.validationAccountURL(user.id, user.username);
            return user;
        } else {
            throw new Error(`CAN NOT CREATE DUPLICATED ACCOUNTS`);
        }

    }


    async login(username: string, password: string, trace: RequestTraceType) {

        // I HAVE TO ADD A DELAY FOR PROCESSING TO AVOID DETECTIONS IN CASE OF CHECKING OVER USERNAMES OR EMAILS
        await new Promise(resolve => setTimeout(resolve, parseInt(_.random(USERS.LOGIN_DELAY.MIN, USERS.LOGIN_DELAY.MAX))));
        const user = await this.UserRepository.findOneBy([{ username, is_active: true, is_email_confirmed: true, is_deleted: false }, { email: username, is_active: true, is_email_confirmed: true, is_deleted: false }]);
        if (!user) {
            throw new Error(`WRONG PASSWORD OR USERNAME`);
        } else {
            const { salt, hash } = user;
            const isPasswordValid = await verifyPassword(password, hash, salt);
            if (isPasswordValid) {
                const access = await this.authenticationService.generateToken(user.id, user.username);
                this.loginUserOperation(user, trace);
                return { access, user }
            } else {
                throw new Error('WRONG PASSWORD OR USERNAME')
            }
        }
    }

    async createUserOperation(user: User, trace: RequestTraceType) {
        const operation = {
            type: UserOperationTypes.CREATE_USER,
            address_ip: trace.ip,
            country: trace.country,
            city: trace.city,
            region: trace.region,
            user_agent: trace.userAgent
        };
        await this.transactionService.create(operation, user);
    }

    async activateUserOperation(user: User, trace: RequestTraceType) {
        const operation = {
            type: UserOperationTypes.CONFIRM_PROFILE,
            address_ip: trace.ip,
            country: trace.country,
            city: trace.city,
            region: trace.region,
            user_agent: trace.userAgent
        };
        await this.transactionService.create(operation, user);
    }

    async loginUserOperation(user: User, trace: RequestTraceType) {
        const operation = {
            type: UserOperationTypes.PROFILE_LOGIN,
            address_ip: trace.ip,
            country: trace.country,
            city: trace.city,
            region: trace.region,
            user_agent: trace.userAgent
        };
        await this.transactionService.create(operation, user);
    }

    validationAccountURL(id: number, username: string): string {
        const emailPerToken = {
            id: id,
            username: username,
            create_at: Date.now(),
            expires_at: Date.now() + USERS.EMAIL_VERFICATION_EXPIRATION_IN_MS
        };
        const token = encrypt(emailPerToken);
        const verificationURL = `${this.configService.get('EXPOSED_URL')}/api/users/auth/activate?token=${token}`;
        this.logger.debug(`WE NEED TO SEND TO THE USER THE FOLLOWING URL TO CLICK ON IT IN ORDER TO ACTIVATE THE ACCOUNT ${verificationURL}`);
        return verificationURL;
    };
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

    async userActivtion(token: string, trace: RequestTraceType) {
        const { id, username, expires_at } = decrypt(token);
        if (parseInt(expires_at, 10) < Date.now()) {
            throw new Error(`TOKEN HAS BEEN EXPIRED`);
        };
        const user = await this.validate(id);
        if (user) {
            const access = await this.authenticationService.generateToken(user.id, user.username);
            return { access, user }
        } else {
            throw new Error('NOT USER FOUND WITH PROVIDED ID')
        }
    }

    async validate(id: number): Promise<User> {
        const update = await this.UserRepository.update({ id, is_email_confirmed: false }, { is_email_confirmed: true, is_active: true });
        if (update.affected) {
            return this.UserRepository.findOneBy({ id });
        } else {
            throw new Error('USER HAS ALREADY VALIDATE HIS ACCOUNT');
        }
    }
}
