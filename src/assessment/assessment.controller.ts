import { Controller, Get, Query, Param } from '@nestjs/common';
import { AssessmentService } from './assessment.service';

@Controller('assessment')
export class AssessmentController {
  constructor(private assessmentService: AssessmentService) {}

  @Get('/')
  getAssessments(@Query() { page = 1 }) {
    return this.assessmentService.getAssessments(page);
  }

  @Get('/student/:studentName')
  filterByStudentName(@Query() { page = 1 }, @Param('studentName') studentName: string) {
    return this.assessmentService.filterByStudentName(page, studentName);
  }

  @Get('/course/:courseName')
  filterByCourseName(@Query() { page = 1 }, @Param('courseName') courseName: string) {
    return this.assessmentService.filterByCourseName(page, courseName);
  }
}
