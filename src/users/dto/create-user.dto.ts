import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateUserDto {
    @IsString()
    public name: string;
    @IsString()
    public username: string;
    @IsEmail()
    public email: string;
    @IsUUID()
    public password: string;
    @IsNumber()
    @Type(() => Number)
    public role_id: number;

}
