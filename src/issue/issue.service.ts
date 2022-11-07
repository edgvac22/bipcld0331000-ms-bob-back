import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { v4 as uuid } from "uuid";
import { DatabaseService } from '../db/db.service';
import { SearchIssueDto } from './dto/search-issue.dto';

@Injectable()
 export class IssueService {
  TABLE_NAME = 'bob';
  constructor(private dbService: DatabaseService) { }

  async createIssue(createIssueDto: CreateIssueDto) {
    const issueObject = {
      issueId: uuid(),
      dateCreate: Date(),
      verify: "no",
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
      throw new InternalServerErrorException(err);
    }
  }

  async listIssue() {
    try {
      return {
        message: 'Retrieved successfully',
        data: await this.dbService
          .connect()
          .query({
            TableName: this.TABLE_NAME,
            IndexName: "verify-index",
            KeyConditionExpression: "verify = :v_solution",
            ExpressionAttributeValues: {
              ":v_solution": "no"
            },
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async searchIssue(searchIssueDto: SearchIssueDto) {
    try {
      return {
        message: 'Retrieved successfully',
        data: await this.dbService
          .connect()
          .query({
            TableName: this.TABLE_NAME,
            IndexName: "verify-index",
            KeyConditionExpression: "verify = :v_solution",
            FilterExpression: "contains(#solutionDetail, :solutionDetail)",
            ExpressionAttributeNames:  {
              "#solutionDetail": "solutionDetail",
            },
            ExpressionAttributeValues: {
              ":solutionDetail": searchIssueDto.solutionDetail,
              ":v_solution": "yes"
            },
          })
          .promise(),
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}