import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { v4 as uuid } from "uuid";

@Injectable()
export class EnvironmentService {
  constructor(private dbService: DatabaseService) { }

  async createEnvironment(createEnvironmentDto: CreateEnvironmentDto) {
    try {
      const params = {
        TableName: process.env.ENVIRONMENT_AREA_TABLE,
        Item: {
          id: uuid(),
          type: 'environment',
          ...createEnvironmentDto,
        }
      };
      return {
        statusCode: 201,
        messageType: `OK Request`,
        message: `Environment created successfully.`,
        detail: await this.dbService.documentClient.put(params).promise(),
      };
    } catch (err) {
      return {
        statusCode: 500,
        messageType: "Error",
        errorMessage: "Internal error.",
      }
    }
  }

  async listEnvironment() {
    try {
      const params = {
        TableName: process.env.ENVIRONMENT_AREA_TABLE,
        IndexName: 'type-index',
        KeyConditionExpression: 'type = :type',
        ExpressionAttributeValues: {
          ':type': 'environment'
        },
      };
      return {
        message: 'Retrieved successfully',
        data: await this.dbService.documentClient.query(params).promise(),
      };

    } catch (err) {
      return {
        statusCode: 500,
        messageType: "Error",
        errorMessage: "Internal error.",
      }
    }
  }
}
