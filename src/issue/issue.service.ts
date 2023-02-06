import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { v4 as uuid } from "uuid";
import { DatabaseService } from '../db/db.service';
import { S3 } from 'aws-sdk';

@Injectable()
export class IssueService {
  s3 = new S3();
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
        statusCode: 500,
        messageType: "Error",
        errorMessage: "Internal error.",
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
        statusCode: 500,
        messageType: "Error",
        errorMessage: "Internal error.",
      }
    }
  }

  async detailIssue(issueId: string) {
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
        statusCode: 500,
        messageType: "Error",
        errorMessage: "Internal error.",
      }
    }
  }

  async getIssueImages(fileId: string) {
    try {
      const params = {
        Bucket: 'plantilla-s3-prueba-ingsw',
        Prefix: `issue/${fileId}/`,
      }
      const data = await this.s3.listObjects(params).promise();
      const files = data.Contents;
      const fileUrls: any = [];
      for (let element of files) {
        const file = element;
        const fileKey = file.Key;
        const fileUrl = this.s3.getSignedUrl('getObject', {
          Bucket: 'plantilla-s3-prueba-ingsw',
          Key: fileKey
        });
        fileUrls.push(fileUrl);
      }
      return {
        statusCode: 200,
        messageType: `OK Request`,
        message: 'Retrieved successfully',
        fileUrls: fileUrls,
      }
    } catch (err) {
      return {
        statusCode: 500,
        messageType: "Error",
        errorMessage: "Internal error.",
      }
    }
  }

  async uploadIssueFile(fileName: string, dataBuffer: Buffer, id: string) {
    try {
      const params = {
        Bucket: 'plantilla-s3-prueba-ingsw',
        Body: dataBuffer,
        Key: `issue/${id}/${uuid()}-${fileName}`,
        ACL: 'public-read'
      }
      return {
        msg: 'Uploaded successfully',
        data: await this.s3.upload(params).promise(),
      }
    } catch (err) {
      return {
        statusCode: 500,
        messageType: "Error",
        errorMessage: "Internal error.",
      }
    }
  }
}