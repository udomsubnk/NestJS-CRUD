import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate, OneToMany } from 'typeorm';
import { EnrollEntity } from '../enroll/enroll.entity';
import { AssesmentEntity } from '../assessment/assessment.entity';

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

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
    enroll => enroll.course_id,
  )
  public enroll!: EnrollEntity[];

  @OneToMany(
    type => AssesmentEntity,
    assesment => assesment.course_id,
  )
  public assesment!: AssesmentEntity[];
}
