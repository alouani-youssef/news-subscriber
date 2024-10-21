import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_STRATEGY } from 'src/common/constants';

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,

            secretOrKey: AUTH_STRATEGY.SECRET,
        });
    }
    async validate(payload: any) {
        return { id: payload.sub, username: payload.username };
    }
}