import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ConflictException, ParseIntPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Pagination } from './dto/pagination.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}


  // create employee
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
 

    const data = await this.employeeService.create(createEmployeeDto);
    return { message: 'Employee created successfully', data };
  }

  // get all employee
  @Get()
  async findAll(@Query() pagination: Pagination) {
    const data = await this.employeeService.findAll(pagination);
    return { message: 'Employees retrieved successfully', data };
  }

 

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: Partial<UpdateEmployeeDto>,
  ) {
    const data = await this.employeeService.update(id, updateEmployeeDto);
    return { message: 'Employee updated successfully', data };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.employeeService.remove(id);
    return { message: 'Employee deleted successfully', data };
  }
}
