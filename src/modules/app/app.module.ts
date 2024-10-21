import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentVariablesValidation } from 'src/common/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validate: EnvironmentVariablesValidation,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
