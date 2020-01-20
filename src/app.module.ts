import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';

@Module({
  imports: [TypeOrmModule.forRoot(), StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
