import { Module } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';

@Module({
  controllers: [IssueController],
  providers: [IssueService, DatabaseService],
  exports: [IssueService],
})
export class IssueModule { }