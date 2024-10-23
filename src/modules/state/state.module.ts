import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { REDIS_CONNECTION_NAME } from 'src/common/constants';

@Global()
@Module({
    imports: [],
    providers: [
        {
            provide: REDIS_CONNECTION_NAME,
            useFactory: (configService: ConfigService) => {
                return new Redis({
                    host: configService.get('REDIS_HOST'),
                    port: configService.get('REDIS_PORT'),
                    password: configService.get('REDIS_PASSWORD'),
                    username: configService.get('REDIS_USERNAME'),
                    db: configService.get('REDIS_DATABASE'),
                    maxRetriesPerRequest: null,
                    connectionName: REDIS_CONNECTION_NAME
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: [
        REDIS_CONNECTION_NAME,
    ],
})
export class StateModule { }
