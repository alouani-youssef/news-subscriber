import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatSubscrbtionDto } from './dtos';
import { AuthGuard } from 'src/common/guards';
import { CurrentAuthenticateUser } from 'src/common/decorators/authenticate.decorator';
import { AuthenticateUser, RequestTraceType } from 'src/common/types';
import { CurrentRequest } from 'src/common/decorators/request.decorator';
import { SubscribtionsService } from './subscribtions.service';
import { ResponseErrorV1Dto, ResponseV1Dto } from 'src/common/dtos/response.dto';
import { SUBSCRIBTION_ERRORS } from 'src/common/constants';

@Controller('subscribtions')
@ApiTags('subscribtions')
export class SubscribtionsController {
    private readonly logger: Logger;
    constructor(private readonly subscribtionsService: SubscribtionsService) {
        this.logger = new Logger(SubscribtionsController.name)
    }

    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({
        description: 'SUBSCRIBE A USER FOR A TOPIC',
        summary: 'CREATE',
    })
    @ApiBody({ type: CreatSubscrbtionDto })
    @ApiHeaders([{ name: 'Authorization', description: 'Bearer Token Recieved On Authentication' }])
    async subscribe(@Body() payload: CreatSubscrbtionDto, @CurrentAuthenticateUser() user: AuthenticateUser, @CurrentRequest() trace: RequestTraceType) {
        try {
            const subscribtion = await this.subscribtionsService.create(payload.topic, user.id, trace);
            return new ResponseV1Dto(true, subscribtion);
        } catch (error) {
            this.logger.debug(
                `FAILD TO CREATE A USER SUBSCRIBTION WITH ERROR : ${JSON.stringify(error)}`,
            );
            throw new HttpException(
                new ResponseErrorV1Dto(
                    SUBSCRIBTION_ERRORS.CREATION.CODE,
                    SUBSCRIBTION_ERRORS.CREATION.MESSAGE,
                    error.message,
                ),
                HttpStatus.BAD_REQUEST,
            );
        }
    }


    @Get("")
    async getSubscribtions() { }


    @Put(":id")
    async update() { }


    @Delete(":id")
    async delete() { }
}
