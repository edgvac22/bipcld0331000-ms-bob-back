import { Handler } from 'aws-lambda';
import { handler, bootstrap } from './serverless';

let server: Handler;
beforeAll(async () => {
  server = await bootstrap();
});

describe('Lambda handler', () => {
  it('should return a response', async () => {
    const event = {
        httpMethod: 'GET',
        path: '/',
        headers: {},
        multiValueHeaders: {},
        queryStringParameters: {},
        multiValueQueryStringParameters: {},
        pathParameters: {},
        stageVariables: {},
        requestContext: {},
        resource: '',
        body: '',
        isBase64Encoded: false
    };
    const context = {
        callbackWaitsForEmptyEventLoop: true,
        functionName: 'testFunction',
        functionVersion: '1',
        invokedFunctionArn: 'arn:aws:lambda:test',
        memoryLimitInMB: '256',
        awsRequestId: 'request-id',
        logGroupName: 'log-group-name',
        logStreamName: 'log-stream-name',
        getRemainingTimeInMillis: () => 100,
        done: jest.fn(),
        fail: jest.fn(),
        succeed: jest.fn(),
      }
    const callback = jest.fn();
    await handler(event, context, callback);
  });
});