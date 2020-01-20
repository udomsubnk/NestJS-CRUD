import { MigrationInterface, QueryRunner, getConnection } from 'typeorm';
import { EnrollEntity } from '../src/enroll/enroll.entity';
import * as enrolls from './enrolls.json';

export class enrolls1579513617045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(EnrollEntity)
      .values(enrolls)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
