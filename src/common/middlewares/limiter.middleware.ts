import { Injectable, NestMiddleware } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { RATE_LIMITER } from '../constants';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    private limiter: rateLimit.RateLimitRequestHandler;

    constructor() {
        this.limiter = rateLimit.rateLimit({
            windowMs: RATE_LIMITER.WINDOW_MS,
            max: RATE_LIMITER.MAX,
            message: RATE_LIMITER.MESSAGE,
            skipSuccessfulRequests: true,
            skipFailedRequests: false,
            keyGenerator: (req: Request) => {
                const ipAddress = req.ip;
                const origin = req.headers.origin || 'unknown';
                const userAgent = req.headers['user-agent'] || 'unknown';
                return `${ipAddress}::${origin}::${userAgent}`;
            }
        });
    }

    use(req: Request, res: Response, next: NextFunction): void {
        this.limiter(req, res, next);
    }
}