import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';

import { EnvironmentVariables, EnvironmentVariablesValidation } from 'src/common/validation';
import { RateLimitMiddleware, TraceMiddleware } from 'src/common/middlewares';
import { EnvironmentType } from 'src/common/types';
import { User } from 'src/modules/users/entities';

import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersModule } from '../users/users.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { AuthenticateUserterceptor, RequestTraceInterceptor } from 'src/common/interceptors';
import { SubscrbtionTransaction, UserTransaction } from '../transactions/entities';
import { Subscribtions } from '../subscribtions/entities';
import { SubscribtionsModule } from '../subscribtions/subscribtions.module';
import { JobsModule } from '../jobs/jobs.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { StateModule } from '../state/state.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: EnvironmentVariablesValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        port: configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [User, UserTransaction, Subscribtions, SubscrbtionTransaction],
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === EnvironmentType.development ? true : false,
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        connection: {
          url: `redis://${configService.get('REDIS_USERNAME')}:${configService.get('REDIS_PASSWORD')}@${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}/${configService.get('REDIS_DATABASE')}`,
        },

      }),
    }),
    AuthenticationModule,
    TransactionsModule,
    UsersModule,
    SubscribtionsModule,
    JobsModule,
    StateModule,
    TerminusModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestTraceInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthenticateUserterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(TraceMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
