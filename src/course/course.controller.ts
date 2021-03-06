import { Controller, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { createCourseDTO, getCourseDTO } from './course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('/')
  getCourses(@Query() { page = 1, keyword = '' }: getCourseDTO) {
    return this.courseService.getCourses(page, keyword);
  }

  @Get('/:id')
  getCourse(@Param('id') id: number) {
    return this.courseService.getCourse(id);
  }

  @Post('/')
  createCourse(@Body() data: createCourseDTO) {
    return this.courseService.createCourse(data);
  }

  @Put('/:id')
  updateCourse(@Param('id') id: number, @Body() data: createCourseDTO) {
    return this.courseService.updateCourse(id, data);
  }

  @Delete('/:id')
  deleteCourse(@Param('id') id: number) {
    return this.courseService.deleteCourse(id);
  }
}
