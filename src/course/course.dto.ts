import { ApiProperty } from '@nestjs/swagger';

export class createCourseDTO {
  @ApiProperty({
    description: "Course's name",
    required: false,
  })
  name: string;

  @ApiProperty({
    description: "Course's detail",
    required: false,
  })
  detail: string;

  @ApiProperty({
    description: "Course's duration",
    default: 1,
    required: false,
  })
  duration: number;
}

export class getCourseDTO {
  @ApiProperty({
    description: 'Page number',
    default: 1,
    required: false,
  })
  page: number;

  @ApiProperty({
    description: 'Search Keyword',
    default: ' ',
    required: false,
  })
  keyword: string;
}
