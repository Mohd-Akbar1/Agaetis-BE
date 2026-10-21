import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Pagination } from './dto/pagination.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository:Repository<Employee>
  ) {}


  
  async create(createEmployeeDto: CreateEmployeeDto) {
       const existing = await this.employeeRepository.findOne({where:{email:createEmployeeDto.email}});
    if (existing) {
      throw new ConflictException('Email already exists');
           }
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async findAll(pagination: Pagination) {
    const { limit, offset } = pagination;
    return this.employeeRepository.find({ take: limit, skip: offset });
  }

 
  async update(id: number, updateEmployeeDto: Partial<UpdateEmployeeDto>) {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    Object.assign(employee, updateEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async remove(id: number) {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {

        throw new NotFoundException(` Employee with ID ${id} not found`);
    }

    await this.employeeRepository.remove(employee);
    return employee;
  }
}
