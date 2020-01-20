import { Controller, Get, Query } from '@nestjs/common';
import { AssessmentService } from './assessment.service';

@Controller('assessment')
export class AssessmentController {
  constructor(private assessmentService: AssessmentService) {}

  @Get('/')
  getAssessments(@Query() { page = 1 }) {
    return this.assessmentService.getAssessments(page);
  }
}
