import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { IssueModule } from './issue/issue.module';

@Module({
  imports: [
    IssueModule,
    DbModule
  ],
})
export class AppModule {}