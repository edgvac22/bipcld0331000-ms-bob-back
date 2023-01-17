import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { v4 as uuid } from "uuid";
import { DatabaseService } from '../db/db.service';

@Injectable()
export class IssueService {
  constructor(private dbService: DatabaseService) { }

  async createIssue(createIssueDto: CreateIssueDto) {
    try {
      const params = {
        TableName: process.env.BOB_TABLE,
        Item: {
          issueId: uuid(),
          dateCreate: Date(),
          verify: "no",
          ...createIssueDto,
        }
      };
      return {
        statusCode: 201,
        messageType: `OK Request`,
        message: `Issue created successfully.`,
        data: await this.dbService.documentClient.put(params).promise(),
      };
    } catch (err) {
      return {
        statusCode: 400,
        messageType: "Bad Request",
        errorCode: "SERVINGSW01",
        errorMessage: "ERROR issue",
        detail: "ERROR createIssue function"
      }
    }
  }

  async listIssue() {
    try {
      const params = {
        TableName: process.env.BOB_TABLE,
        IndexName: 'verify-index',
        KeyConditionExpression: 'verify = :v_solution',
        ExpressionAttributeValues: {
          ':v_solution': 'no'
        },
      };
      return {
        message: 'Retrieved successfully',
        data: await this.dbService.documentClient.query(params).promise(),
      };

    } catch (err) {
      return {
        statusCode: 400,
        messageType: "Bad Request",
        errorCode: "SERVINGSW02",
        errorMessage: "ERROR issue",
        detail: "ERROR listIssue function"
      }
    }
  }

  async getIssue(issueId: string) {
    try {
      const params = {
        TableName: process.env.BOB_TABLE,
        Key: { issueId: issueId },
      }
      return {
        message: 'Retrieved successfully',
        data: await this.dbService.documentClient.get(params).promise(),
      };
    } catch (err) {
      return {
        statusCode: 400,
        messageType: "Bad Request",
        errorCode: "SERVINGSW09",
        errorMessage: "ERROR issue",
        detail: "ERROR getIssue function"
      }
    }
  }
}