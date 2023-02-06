import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../db/db.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { v4 as uuid } from "uuid";

@Injectable()
export class AreaService {

  constructor(private dbService: DatabaseService) { }

  async createArea(createAreaDto: CreateAreaDto) {
    try {
      const params = {
        TableName: process.env.ENVIRONMENT_AREA_TABLE,
        Item: {
          id: uuid(),
          type: 'area',
          ...createAreaDto,
        }
      };
      return {
        statusCode: 201,
        messageType: `OK Request`,
        message: `Area created successfully.`,
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

  async listArea() {
    try {
      const params = {
        TableName: process.env.ENVIRONMENT_AREA_TABLE,
        IndexName: 'type-index',
        KeyConditionExpression: 'type = :type',
        ExpressionAttributeValues: {
          ':type': 'area'
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
