import { IsNumber, IsPositive,Min } from "class-validator"
import { Type } from "class-transformer"

export class Pagination{
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Min(1)
   limit:number= 10

   @Type(() => Number)
   @IsNumber()
    @Min(0)
   offset:number =0
}