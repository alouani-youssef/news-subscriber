import {
    ExecutionContext,
    NotFoundException,
    createParamDecorator,
} from '@nestjs/common';
import { AuthenticateUser } from '../types';

export const CurrentAuthenticateUser = createParamDecorator(
    (field: keyof AuthenticateUser, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        if (!request.authenticateUser)
            throw new NotFoundException('NO USER IS LINKED WITH THIS PROPERY',);
        return field ? request.authenticateUser?.[field] : request.authenticateUser;
    },
);
