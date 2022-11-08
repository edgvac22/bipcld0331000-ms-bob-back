import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class DatabaseService {
  documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: 'us-east-1' });
}