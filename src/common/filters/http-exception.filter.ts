import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';

@Catch(AxiosError)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception:
        AxiosError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const
            errorStatus = exception.response?.status ?? 500;
        const fullUrl = exception.response?.config?.baseURL + (exception.response?.config?.url ?? '');

        this.logger.error({
            statusCode: errorStatus,
            url: fullUrl,
            payload: exception.response?.config?.data
                ? JSON.parse(exception.response.config.data)
                : null,
            params: exception.response?.config?.params,
            method: exception.response?.config?.method,
            message: exception.response?.data,
        });

        response.status(errorStatus).json({
            success: false,
            statusCode: errorStatus,
            path: request.url,
            message: exception.response?.data,
        });
    }
}