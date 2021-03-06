import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, OneToMany } from 'typeorm';
import { EnrollEntity } from '../enroll/enroll.entity';
import { AssesmentEntity } from '../assessment/assessment.entity';

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  dob: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  @OneToMany(
    type => EnrollEntity,
    enroll => enroll.student_id,
  )
  public enroll!: EnrollEntity[];

  @OneToMany(
    type => AssesmentEntity,
    assesment => assesment.student_id,
  )
  public assesment!: AssesmentEntity[];
}
