import { Module } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { SolutionController } from './solution.controller';
import { SolutionService } from './solution.service';

@Module({
  controllers: [SolutionController],
  providers: [SolutionService, DatabaseService],
  exports: [SolutionService],
})
export class SolutionModule { }