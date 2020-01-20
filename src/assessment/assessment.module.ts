import { Module } from '@nestjs/common';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssesmentEntity } from './assessment.entity';
import { StudentEntity } from 'src/student/student.entity';
import { CourseEntity } from 'src/course/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssesmentEntity, StudentEntity, CourseEntity])],
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}
