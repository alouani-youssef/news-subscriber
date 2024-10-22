import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsNumber, IsString, IsStrongPassword, Length } from "class-validator";
import { GENDERS } from "src/common/types";

export class CreateDto {

    @ApiProperty({
        description: 'user username, a unique identifier for the user',
        required: true,
        maxLength: 20,
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'the user first name',
        required: true,
        maxLength: 20,
    })
    @IsString()
    first_name: string;

    @ApiProperty({
        description: 'the user last name',
        required: true,
        maxLength: 20,
    })
    @IsString()
    last_name: string;


    @ApiProperty({
        description: 'the user country code in  ISO-3166-1 alpha-2 formats',
        required: true,
        maxLength: 2,
    })
    @IsString()
    @Length(2)
    country: string;

    @ApiProperty({
        description: 'the user city',
        required: false,
        maxLength: 20,
    })
    @IsString()
    city?: string;


    @ApiProperty({
        description: 'The user birthdate in the format YYYY-MM-DD',
        required: true,
        maxLength: 30,
    })
    @IsDateString()
    birth_date?: Date;


    @ApiProperty({
        description: 'The user gender which is an enum MALE OR FEMELE',
        required: false,
        enum: GENDERS
    })
    @IsString()
    gender?: GENDERS;

    @ApiProperty({
        description: 'The user passowrd, it should be a strong password',
        required: true,
        maxLength: 30,
    })
    @IsString()
    @IsStrongPassword()
    passowrd: string;


    @ApiProperty({
        description: 'The user email, it should be a in email format',
        required: true,
        maxLength: 30,
    })
    @IsString()
    @IsEmail()
    email: string;
}
