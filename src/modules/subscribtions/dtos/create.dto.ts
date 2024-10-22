import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatSubscrbtionDto {

    @ApiProperty({
        description: 'The Topic A user is intereset to recieve notification From',
        required: true,
        maxLength: 20,
    })
    @IsString()
    topic: string;
}
