import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword } from "class-validator";

export class CreateDto {

    @ApiProperty({
        description: 'user username, a unique identifier for the user',
        required: true,
        maxLength: 20,
    })
    @IsString()
    username: string;


    @ApiProperty({
        description: 'The user passowrd, it should be a strong password',
        required: true,
        maxLength: 30,
    })
    @IsString()
    @IsStrongPassword()
    passowrd: string;
}
