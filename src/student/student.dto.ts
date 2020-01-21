import { ApiProperty } from '@nestjs/swagger';

export class createStudentDTO {
  @ApiProperty({
    description: "Student's name",
    required: false,
  })
  name: string;

  @ApiProperty({
    description: "Student's email",
    required: false,
  })
  email: string;

  @ApiProperty({
    description: "Student's phone number",
    required: false,
  })
  phone: string;

  @ApiProperty({
    description: "Student's birth date",
    required: false,
  })
  dob: Date;
}

export class getStudentDTO {
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
