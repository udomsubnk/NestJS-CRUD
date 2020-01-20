import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { StudentEntity } from './student.entity';
import { studentDTO } from './student.dto';
import * as DATABASE_QUERY from '../../constraints/DATABASE_QUERY.json';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async getStudents(page: number, keyword: string) {
    const QUERY_LIMIT = DATABASE_QUERY.STUDENT.LIMIT_PER_QUERY;
    const skip = page >= 1 ? QUERY_LIMIT * (page - 1) : 0;

    return await this.studentRepository.find({
      where: [
        { name: Like(`%${keyword}%`) },
        { email: Like(`%${keyword}%`) },
        { phone: Like(`%${keyword}%`) },
      ],
      take: QUERY_LIMIT,
      skip,
    });
  }

  async getStudent(id: number) {
    return await this.studentRepository.findOne({ where: { id } });
  }

  async createStudent(data: studentDTO) {
    const student = await this.studentRepository.create(data);
    await this.studentRepository.save(student);
    return student;
  }

  async updateStudent(id: number, data: Partial<studentDTO>) {
    return await this.studentRepository.update({ id }, data);
  }

  async deleteStudent(id: number) {
    return await this.studentRepository.delete({ id });
  }
}
