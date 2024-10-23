import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { SUPPORTED_TOPICS } from "src/common/constants";

export class CreatSubscrbtionDto {

    @ApiProperty({
        description: 'The Topic A user is intereset to recieve notification From',
        enum: SUPPORTED_TOPICS,
        required: true,
        maxLength: 20,
    })
    @IsString()
    @IsEnum(SUPPORTED_TOPICS)
    topic: SUPPORTED_TOPICS;
}
