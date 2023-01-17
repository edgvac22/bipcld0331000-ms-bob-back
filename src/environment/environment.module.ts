import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { EnvironmentController } from './environment.controller';
import { DatabaseService } from '../db/db.service';

@Module({
  controllers: [EnvironmentController],
  providers: [EnvironmentService, DatabaseService],
  exports: [EnvironmentService]
})
export class EnvironmentModule {}
