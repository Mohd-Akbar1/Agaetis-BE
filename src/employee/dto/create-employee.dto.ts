import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../entities/employee.entity';


export class CreateEmployeeDto {

    @IsString()
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;


    @IsEnum(Role)
    role: Role;
    

}
