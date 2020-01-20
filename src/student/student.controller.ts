import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { studentDTO } from './student.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('/')
  getStudents(@Query() { page = 1, keyword = '' }) {
    return this.studentService.getStudents(page, keyword);
  }

  @Get('/:id')
  getStudent(@Param('id') id: number) {
    return this.studentService.getStudent(id);
  }

  @Post('/')
  createStudent(@Body() data: studentDTO) {
    return this.studentService.createStudent(data);
  }

  @Put('/:id')
  updateStudent(@Param('id') id: number, @Body() data: Partial<studentDTO>) {
    return this.studentService.updateStudent(id, data);
  }

  @Delete('/:id')
  deleteStudent(@Param('id') id: number) {
    return this.studentService.deleteStudent(id);
  }
}
