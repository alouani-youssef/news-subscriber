import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscribtions } from './entities';
import { Repository } from 'typeorm';
import { User } from '../users/entities';
import { SubscrbtionTransactionsService } from '../transactions/services/subscribtion.service';
import { createSubscrbtionTransactionDTO, RequestTraceType, SubscrbtionOperationTypes } from 'src/common/types';

@Injectable()
export class SubscribtionsService {
    private readonly logger: Logger;
    constructor(
        @InjectRepository(Subscribtions)
        private readonly SubscribtionsRepository: Repository<Subscribtions>,
        private readonly subscrbtionTransactionsService: SubscrbtionTransactionsService,
        private readonly userService: UsersService,
    ) {
        this.logger = new Logger(SubscribtionsService.name);
    }
    async create(topic: string, userID: number, trace: RequestTraceType) {
        const user = await this.userService.getByID(userID);
        if (!user) {
            throw new Error(`YOU ARE NOT ALLOW TO TRIGGER SUBSCRIBTION OPERATION`);
        }
        const currentSubscribtions = await this.getCurrentSubscribtions(user);
        if (currentSubscribtions >= user.max_subscribtion) {
            throw new Error(
                `YOU HAVE REACHED MAX OF SUBSCRUBTION YOU ARE ALLOW TO MAKE`,
            );
        }
        const subscribtionWrap = this.SubscribtionsRepository.create({
            topic,
            user: user,
            is_deleted: false,
            is_subscribed: true,
        });
        const subscribtion = await this.SubscribtionsRepository.save(subscribtionWrap);
        await this.subscribtionCreationOperation(subscribtion, user, trace);
    }
    async getCurrentSubscribtions(user: User) {
        return this.SubscribtionsRepository.countBy({
            user: user,
            is_deleted: false,
            is_subscribed: false,
        });
    }

    async subscribtionCreationOperation(subscrbtion: Subscribtions, user: User, trace: RequestTraceType) {
        const event: createSubscrbtionTransactionDTO = {
            type: SubscrbtionOperationTypes.SUBSCRIBE,
            address_ip: trace.ip,
            city: trace.city,
            user_agent: trace.userAgent,
            country: trace.country,
            region: trace.region,
            topic: subscrbtion.topic,

        }
        this.subscrbtionTransactionsService.create(event, user, subscrbtion);
    }
}
