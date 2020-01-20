import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { Repository } from 'typeorm';
import * as DATABASE_QUERY from '../../constraints/DATABASE_QUERY.json';
import { courseDTO } from './course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) {}

  async getCourses(page: number) {
    const QUERY_LIMIT = DATABASE_QUERY.COURSE.LIMIT_PER_QUERY;
    const skip = page >= 1 ? QUERY_LIMIT * (page - 1) : 0;

    return await this.courseRepository.find({
      take: QUERY_LIMIT,
      skip,
    });
  }

  async getCourse(id: number) {
    return await this.courseRepository.findOne({ where: { id } });
  }

  async createCourse(data: courseDTO) {
    const course = await this.courseRepository.create(data);
    await this.courseRepository.save(course);
    return course;
  }

  async updateCourse(id: number, data: Partial<courseDTO>) {
    return await this.courseRepository.update({ id }, data);
  }

  async deleteCourse(id: number) {
    return await this.courseRepository.delete({ id });
  }
}