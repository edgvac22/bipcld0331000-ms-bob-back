import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { v4 as uuid } from "uuid";
import { DatabaseService } from './db/db.service';

@Injectable()
export class IssueService {
  TABLE_NAME = 'bob-dev';
  private readonly logger = new Logger(IssueService.name);
  constructor(private dbService: DatabaseService) {}
  
    async createIssue(createIssueDto: CreateIssueDto) {
      const issueObject = {
        issueId: uuid(),
        ...createIssueDto,
      };
      try {
        await this.dbService
            .connect()
            .put({
              TableName: this.TABLE_NAME,
              Item: issueObject,
            })
            .promise();
        return {
          statusCode: 201,
          messageType: `OK Request`,
          message: `Issue created successfully.`,
          detail: issueObject,
        };
      } catch (err) {
        this.logger.log(new InternalServerErrorException(err));
        return {
          statusCode: 400,
          messageType: `Bad Request`,
          errorCode: `BOBSW01`,
          errorMessage: `ERROR issue`,
          detail: `ERROR createIssue function`
        };
      }
    }
  }