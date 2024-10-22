import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { EnvironmentVariables, EnvironmentVariablesValidation } from 'src/common/validation';
import { RateLimitMiddleware, TraceMiddleware } from 'src/common/middlewares';


import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentType } from 'src/common/types';
import { User } from 'src/modules/users/entities';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { AUTH_STRATEGY } from 'src/common/constants';
import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersModule } from '../users/users.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestTraceInterceptor } from 'src/common/interceptors';
import { UserTransaction } from '../transactions/entities';
import { Subscribtions } from '../subscribtions/entities';

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
        entities: [User, UserTransaction, Subscribtions],
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') === EnvironmentType.development ? true : false,
      }),
    }),
    PassportModule.register({
      defaultStrategy: AUTH_STRATEGY.NAME
    }),
    AuthenticationModule,
    TransactionsModule,
    UsersModule,
    TerminusModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestTraceInterceptor,
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
