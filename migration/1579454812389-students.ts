import { MigrationInterface, QueryRunner, getConnection } from 'typeorm';
import { StudentEntity } from '../src/student/student.entity';
import * as students from './students.json';

export class students1579454812389 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(StudentEntity)
      .values(students)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
