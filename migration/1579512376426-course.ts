import { MigrationInterface, QueryRunner, getConnection } from 'typeorm';
import { CourseEntity } from '../src/course/course.entity';
import * as courses from './courses.json';

export class course1579512376426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(CourseEntity)
      .values(courses)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
