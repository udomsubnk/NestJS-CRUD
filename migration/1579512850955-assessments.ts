import { MigrationInterface, QueryRunner, getConnection } from 'typeorm';
import { AssesmentEntity } from '../src/assessment/assessment.entity';
import * as assessment from './assessments.json';

export class assessments1579512850955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(AssesmentEntity)
      .values(assessment)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
