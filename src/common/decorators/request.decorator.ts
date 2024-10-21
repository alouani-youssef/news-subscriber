import {
    ExecutionContext,
    NotFoundException,
    createParamDecorator,
} from '@nestjs/common';
import { RequestTraceType } from '../types';

export const CurrentRequest = createParamDecorator(
    (field: keyof RequestTraceType, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (!request.currentUser)
            throw new NotFoundException('NO TRACE FOUND',);
        return field ? request.currentUser?.[field] : request.currentUser;
    },
);
