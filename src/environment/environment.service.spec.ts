import { EnvironmentService } from './environment.service';
import { DatabaseService } from '../db/db.service'
import * as AWS from 'aws-sdk-mock';
import { CreateEnvironmentDto } from './dto/create-environment.dto';

describe('EnvironmentService', () => {
  let databaseService: DatabaseService;
  let environmentService: EnvironmentService;
  let createEnvironmentDto: CreateEnvironmentDto;

  beforeEach(() => {
    environmentService = new EnvironmentService(databaseService);
  });

  describe('createEnvironment', () => {

    it('should create an environment', async () => {
      AWS.mock('DynamoDB.DocumentClient', 'put', function (params: any, callback: any) {
        return callback(null, {
          statusCode: 201,
          messageType: "OK Request",
          message: "Environment created successfully.",
        });
      });
    });

    it('createEnvironment function error', async function () {
      const result = await environmentService.createEnvironment(createEnvironmentDto);
      expect(result.errorMessage).toContain("Internal error.");
    });
  });

  describe('listEnvironment', () => {

    it('should return environment list', async () => {
      AWS.mock('DynamoDB.DocumentClient', 'query', function (params: any, callback: any) {
        return callback(null, {
          message: 'Retrieved successfully',
        });
      });
    });

    it('listEnvironment function error', async function () {
      const result = await environmentService.listEnvironment();
      expect(result.errorMessage).toContain("Internal error.");
    });
  });
});
