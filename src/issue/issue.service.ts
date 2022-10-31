import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { v4 as uuid } from "uuid";
import { DatabaseService } from '../db/db.service';

@Injectable()
export class IssueService {
  TABLE_NAME = 'bob';
  constructor(private dbService: DatabaseService) { }

  async createIssue(createIssueDto: CreateIssueDto) {
    const issueObject = {
      issueId: uuid(),
      dateCreate: Date(),
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