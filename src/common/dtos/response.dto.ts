import { VERSIONS } from "../constants";
import { BadRequestException } from '@nestjs/common';

export class ResponseV1Dto {
    readonly data: any;
    readonly success: boolean;
    readonly version: string;

    constructor(success: boolean, data: any) {
        this.success = success;
        this.data = data;
        this.version = VERSIONS.V1;
    }
}

export class ResponseErrorV1Dto {
    readonly data: any;
    readonly error: any;
    readonly success: boolean;
    readonly version: string;

    constructor(
        error_code: string,
        error_message: string,
        error_details: string
    ) {
        this.success = false;
        this.data = null;
        this.error = {
            code: error_code,
            message: error_message,
            details: error_details,
        };
        this.version = VERSIONS.V1;
    }
}