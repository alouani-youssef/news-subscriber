import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AUTH_STRATEGY } from 'src/common/constants';
import { JwtStrategy } from './strategy';
import { AuthenticationService } from './authentication.service';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: AUTH_STRATEGY.NAME
        }),
        JwtModule.register({
            secret: AUTH_STRATEGY.SECRET,
            signOptions: { expiresIn: AUTH_STRATEGY.EXPERIS_IN_MINUTES }
        }),],
    providers: [JwtStrategy, AuthenticationService],
    exports: [JwtStrategy, AuthenticationService]
})
export class AuthenticationModule { }
