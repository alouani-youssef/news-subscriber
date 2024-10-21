import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { JwtStrategy } from '../authentication/strategy';
import { AuthenticationModule } from '../authentication/authentication.module';
import { TransactionsModule } from '../transactions/transactions.module';



@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthenticationModule, TransactionsModule],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
