import { Injectable } from '@nestjs/common';
import { AssesmentEntity } from './assessment.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as DATABASE_QUERY from '../constraints/DATABASE_QUERY.json';
import { StudentEntity } from 'src/student/student.entity';
import { UtilityFunctions } from 'src/helpers/utility';
import { CourseEntity } from 'src/course/course.entity';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectRepository(AssesmentEntity)
    private assessmentRepository: Repository<AssesmentEntity>,

    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,

    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) {}

  async getAssessments(page: number) {
    const STUDENT_LIMIT = DATABASE_QUERY.ASSESSMENT.LIMIT_STUDENT_PER_QUERY;
    const skip = UtilityFunctions.calculateDatabaseQueryOffset(page, STUDENT_LIMIT);

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
      .orderBy('assessments.course_id', 'ASC')
      .getMany();

    const studentsAssessments = students.map(student => ({
      ...student,
      assessments: assessments.filter(({ student_id }) => student_id === student.id),
    }));

    return { students: studentsAssessments, current_page: page };
  }

  async filterByStudentName(page: number, studentName: string) {
    const STUDENT_LIMIT = DATABASE_QUERY.ASSESSMENT.LIMIT_STUDENT_PER_QUERY;
    const skip = UtilityFunctions.calculateDatabaseQueryOffset(page, STUDENT_LIMIT);

    const students = await this.studentRepository.find({
      where: [{ name: Like(`%${studentName}%`) }],
      order: { id: 'ASC' },
      take: STUDENT_LIMIT,
      skip,
    });

    const studentIds = students.map(({ id }) => id);

    const assessments = await this.assessmentRepository
      .createQueryBuilder('assessments')
      .leftJoinAndSelect('assessments.course', 'courses')
      .where('assessments.student_id IN (:...studentIds)', { studentIds })
      .orderBy('assessments.course_id', 'ASC')
      .getMany();

    const studentsAssessments = students.map(student => ({
      ...student,
      assessments: assessments.filter(({ student_id }) => student_id === student.id),
    }));

    return { students: studentsAssessments, current_page: page };
  }

  async filterByCourseName(page: number, courseName: string) {
    const STUDENT_LIMIT = DATABASE_QUERY.ASSESSMENT.LIMIT_COURSE_PER_QUERY;
    const skip = UtilityFunctions.calculateDatabaseQueryOffset(page, STUDENT_LIMIT);

    const courses = await this.courseRepository.find({
      where: [{ name: Like(`%${courseName}%`) }],
      order: { id: 'ASC' },
      take: STUDENT_LIMIT,
      skip,
    });

    const courseIds = courses.map(({ id }) => id);

    const assessments = await this.assessmentRepository
      .createQueryBuilder('assessments')
      .leftJoinAndSelect('assessments.student', 'students')
      .where('assessments.course_id IN (:...courseIds)', { courseIds })
      .orderBy('assessments.student_id', 'ASC')
      .getMany();

    const coursesAssessments = courses.map(course => ({
      ...course,
      enrolled_students: assessments.filter(({ course_id }) => course_id === course.id),
    }));

    return { courses: coursesAssessments, current_page: page };
  }
}
