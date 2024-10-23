import { InjectQueue } from '@nestjs/bullmq';
import {
    Inject,
    Injectable,
    Logger,
    OnModuleInit,
} from '@nestjs/common';
import { Job, Queue, Worker } from 'bullmq';
import { SUPPORTED_TOPICS, TOPIC_WATCHER } from 'src/common/constants';
import { JobType } from '../types/job.type';
import Redis from 'ioredis';


/**
 * @module AccountJobService
 * @description
 * By Default We Can Extract Each 20 Seconds:
 * - ACCOUNT NEW TWEETS
 * - ACCOUNT TWEET REPLY
 * - ACCOUNT TWEET MENTION
 * - ACCOUNT TWEET RETWEET
 * - ACCOUNT FOLLOWERS
 * - ACCOUNT FOLLOWING
 */

@Injectable()
export class NewsORGJobService implements OnModuleInit {
    private readonly logger: Logger;
    private topicWorker: Worker;
    constructor(
        @InjectQueue(TOPIC_WATCHER.QUEUE_NAME)
        private readonly topicQueue: Queue,
        @Inject('REDIS_CONNECTION') private redisConnection: Redis,

    ) {
        this.logger = new Logger(NewsORGJobService.name);
    }

    onModuleInit() {
        this.logger.log('LUNCHING WATCH ACCOUNT JOB');
        this.topicWorker = new Worker(
            TOPIC_WATCHER.QUEUE_NAME,
            async (job: Job<JobType>) => {
                try {
                    const dara: JobType = job.data;
                    await this.processeur(dara);
                } catch (error) {
                    this.logger.fatal(`PROCESSING FAILD`);
                }
            }, {
            connection: this.redisConnection,
        }
        );

        this.topicWorker.on('ready', () => {
            this.logger.log('THE WORKER IS READY TO RECIEVE JOBS');
        });
        this.topicWorker.on('active', () => {
            this.logger.log(`WORKER FOR WATCH ACCOUNTS IS CURRENTLY ACTIVE`);
        });

        this.topicWorker.on('completed', (job) => {
            this.logger.log(`Job ${job.id} completed successfully`);
        });

        this.topicWorker.on('failed', (job, err) => {
            this.logger.error(`Job ${job.id} failed with error: ${err.message}`);
        });
        this.topicWorker.on('error', (err) => {
            this.logger.error(`Worker encountered an error: ${err.message}`);
        });

    }

    async schedule(
        topic: SUPPORTED_TOPICS,
        repeatEachMS: number,
    ): Promise<boolean> {
        try {
            this.logger.log(`LUNCH ACCOUNT WATCH JOB FOR TOPIC : ${topic}`);
            // WE NEED TO PUSH JOBS INTO THE TOPIC JOBS QUEUE
        } catch (error) {
            this.logger.fatal(
                `FAILD TO ADD JOB TO WATCH TOPIC WITH ID ${topic} WITH ERROR ${error}`,
            );
            return false;
        }
    }

    async processeur(job: JobType) {
        try {

        } catch (error) {
            this.logger.fatal(`FAILD TO PROCESS JOB WITH ERROR ${JSON.stringify(error)}`);
            throw new Error(`PROCESSING FAILD FOR JOB FOR TOPIC: ${job.topic} FOR USER ID: ${job.userID}`);
        }
    }
}
