import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StudentEntity } from '../student/student.entity';
import { CourseEntity } from '../course/course.entity';

@Entity('enrolls')
export class EnrollEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  student_id!: number;

  @Column()
  course_id!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrolled_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  @ManyToOne(
    type => StudentEntity,
    student => student.id,
  )
  @JoinColumn({ name: 'student_id' })
  public student!: StudentEntity;

  @ManyToOne(
    type => CourseEntity,
    course => course.id,
  )
  @JoinColumn({ name: 'course_id' })
  public course!: CourseEntity;
}
