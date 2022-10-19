import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { v4 as uuid } from "uuid";
import { DatabaseService } from './db/db.service';

@Injectable()
export class IssueService {
  TABLE_NAME = 'BobTable';

  constructor(private dbService: DatabaseService) {}
  
    async createIssue(createIssueDto: CreateIssueDto) {
      const issueObject = {
        issueId: uuid(),
        ...createIssueDto,
      };
  
      try {
        return {
          message: 'Record created successfully!',
          data: await this.dbService
            .connect()
            .put({
              TableName: this.TABLE_NAME,
              Item: issueObject,
            })
            .promise(),
        };
      } catch (err) {
        throw new InternalServerErrorException(err);
      }
    }
  }
