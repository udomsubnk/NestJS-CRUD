import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { StudentEntity } from '../student/student.entity';
import { CourseEntity } from '../course/course.entity';

@Entity('assesments')
export class AssesmentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  student_id!: number;

  @Column()
  course_id!: number;

  @Column({ nullable: true })
  score!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

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
