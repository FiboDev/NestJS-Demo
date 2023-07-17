import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ROLES } from "src/constants/roles";

export class UpdateUserDTO  {

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsNumber()
    age: number;

    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsEnum(ROLES)
    role: ROLES;
}
