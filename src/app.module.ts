import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { IssueModule } from './issue/issue.module';
import { SolutionModule } from './solution/solution.module';
import { AreaModule } from './area/area.module';
import { EnvironmentModule } from './environment/environment.module';

@Module({
  imports: [
    IssueModule,
    SolutionModule,
    DbModule,
    AreaModule,
    EnvironmentModule
  ],
})
export class AppModule { }