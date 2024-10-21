import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class RequestTraceInterceptor implements NestInterceptor {
    private readonly logger = new Logger(RequestTraceInterceptor.name);

    constructor(
    ) {
        this.logger = new Logger(RequestTraceInterceptor.name);
    }

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        if (request['user'])
            try {
                request.currentUser = request['user']
            } catch (error) {
                this.logger.fatal(error);
            }

        return next.handle();
    }
}
