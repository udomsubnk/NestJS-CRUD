import { Injectable } from '@nestjs/common';
import { AssesmentEntity } from './assessment.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as DATABASE_QUERY from '../../constraints/DATABASE_QUERY.json';
import { StudentEntity } from 'src/student/student.entity';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectRepository(AssesmentEntity)
    private assessmentRepository: Repository<AssesmentEntity>,

    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async getAssessments(page: number) {
    const STUDENT_LIMIT = DATABASE_QUERY.ASSESSMENT.LIMIT_STUDENT_PER_QUERY;
    const skip = page >= 1 ? STUDENT_LIMIT * (page - 1) : 0;

    const students = await this.studentRepository.find({
      order: { id: 'ASC' },
      take: STUDENT_LIMIT,
      skip,
    });

    const studentIds = students.map(({ id }) => id);

    const assessments = await this.assessmentRepository
      .createQueryBuilder('assessments')
      .leftJoinAndSelect('assessments.course', 'courses')
      .where('assessments.student_id IN (:...studentIds)', { studentIds })
      .getMany();

    const studentsAssessments = students.map(student => ({
      ...student,
      assessments: assessments
        .filter(({ student_id }) => student_id === student.id)
        .map(({ course }) => course),
    }));

    return studentsAssessments;
  }
}
