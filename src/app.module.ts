import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { IssueModule } from './issue/issue.module';
import { SolutionModule } from './solution/solution.module';

@Module({
  imports: [
    IssueModule,
    SolutionModule,
    DbModule
  ],
})
export class AppModule {}