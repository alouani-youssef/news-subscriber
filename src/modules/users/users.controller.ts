import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseErrorV1Dto, ResponseV1Dto } from 'src/common/dtos/response.dto';
import { CurrentRequest } from 'src/common/decorators/request.decorator';
import { RequestTraceType } from 'src/common/types';
import { USERS_ERRORS } from 'src/common/constants';

import { UsersService } from './users.service';
import { CreateDto } from './dtos/create.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
    private readonly logger: Logger;
    constructor(private readonly userService: UsersService) {
        this.logger = new Logger(UsersController.name);
    }
    @Post()
    @ApiOperation({
        description: 'CREATE NEW USER',
        summary: 'CREATE',
    })
    @ApiBody({ type: CreateDto })
    async create(@Body() payload: CreateDto, @CurrentRequest() trace: RequestTraceType) {
        try {
            const user = await this.userService.create(payload, trace);
            if (user) {
                const creationMessage = {
                    message: 'ACCOUNT HAS BEEN CREATED',
                    details: 'YOUR ACCOUNT IS NOW CREATED PLEASE CHECK YOUR EMAIL TO ACTIVATE YOUR ACCOUNT'
                }
                return new ResponseV1Dto(true, creationMessage);
            }

        } catch (error) {
            this.logger.debug(`FAILD TO CREATE USER WITH ERROR : ${JSON.stringify(error)}`)
            throw new HttpException(
                new ResponseErrorV1Dto(
                    USERS_ERRORS.CREATION.CODE,
                    USERS_ERRORS.CREATION.MESSAGE,
                    error.message
                ),
                HttpStatus.BAD_REQUEST
            );
        }
    }


    @Get('auth/activate')
    @ApiOperation({
        description: 'URL THE USER SHOULD FOLLOW TO RECEIVE EMAIL TO ACTIVATE HIS ACCOUNT',
        summary: 'CREATE',
    })
    @ApiParam({ type: 'string', name: 'id' })
    async activateAccount(@Query('id') id: number, @Query('key') key: string, @CurrentRequest() trace: RequestTraceType) {
        try {
        
        } catch (error) {
            console.error(error);
            throw new ResponseErrorV1Dto(USERS_ERRORS.CREATION.CODE, USERS_ERRORS.CREATION.MESSAGE, error.message);
        }
    }
}
