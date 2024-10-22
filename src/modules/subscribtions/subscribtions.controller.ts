import { Controller, Delete, Get, Logger, Post, Put } from '@nestjs/common';
import { ApiBody, ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('subscribtions')
@ApiTags('subscribtions')
export class SubscribtionsController {
    private readonly logger: Logger;
    constructor() {
        this.logger = new Logger(SubscribtionsController.name)
    }

    @Post()
    @ApiOperation({
        description: 'SUBSCRIBE A USER FOR A TOPIC',
        summary: 'CREATE',
    })
    @ApiBody({ type: null })
    @ApiHeaders([])
    async subscribe() { }


    @Get("")
    async getSubscribtions() { }


    @Put(":id")
    async update() { }


    @Delete(":id")
    async delete() { }
}
