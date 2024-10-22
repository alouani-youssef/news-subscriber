import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticateUserterceptor implements NestInterceptor {
    private readonly logger: Logger;

    constructor(
    ) {
        this.logger = new Logger(AuthenticateUserterceptor.name);
    }

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        if (request['authenticate'])
            try {
                request.authenticateUser = request['authenticate']
            } catch (error) {
                this.logger.fatal(error);
            }

        return next.handle();
    }
}
