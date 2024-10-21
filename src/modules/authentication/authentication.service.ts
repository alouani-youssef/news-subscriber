import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH_STRATEGY } from 'src/common/constants';
import { JWT_ACCESS } from 'src/common/types';

@Injectable()
export class AuthenticationService {
    private readonly logger: Logger;
    constructor(private jwtService: JwtService) {
        this.logger = new Logger(AuthenticationService.name)
    }

    async generateToken(id: number, username: string): Promise<JWT_ACCESS> {
        this.logger.debug(`GENERATING TOKEN FOR USER WITH ID ${id}`);
        const payload = { id, username };
        return {
            access: {
                token: (await this.jwtService.signAsync(payload)),
                expireIn: AUTH_STRATEGY.EXPERIS_IN_MINUTES
            },
            refresh: {
                token: (await this.jwtService.signAsync(payload, { expiresIn: AUTH_STRATEGY.REFRECH_EXPERIES_IN_MINUTES })),
                expireIn: AUTH_STRATEGY.REFRECH_EXPERIES_IN_MINUTES
            }
        };
    }
}