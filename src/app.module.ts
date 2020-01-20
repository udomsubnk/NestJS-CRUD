import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { AssessmentModule } from './assessment/assessment.module';

@Module({
  imports: [TypeOrmModule.forRoot(), StudentModule, CourseModule, AssessmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
