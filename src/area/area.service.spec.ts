import { DatabaseService } from '../db/db.service'
import * as AWS from 'aws-sdk-mock';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';

describe('AreaService', () => {
  let databaseService: DatabaseService;
  let areaService: AreaService;
  let createAreaDto: CreateAreaDto;

  beforeEach(() => {
    areaService = new AreaService(databaseService);
  });

  describe('createArea', () => {

    it('should create an area', async () => {
      AWS.mock('DynamoDB.DocumentClient', 'put', function (params: any, callback: any) {
        return callback(null, {
          statusCode: 201,
          messageType: "OK Request",
          message: "Area created successfully.",
        });
      });
    });

    it('createArea function error', async function () {
      const result = await areaService.createArea(createAreaDto);
      expect(result.errorMessage).toContain("Internal error.");
    });
  });

  describe('listArea', () => {

    it('should return area list', async () => {
      AWS.mock('DynamoDB.DocumentClient', 'query', function (params: any, callback: any) {
        return callback(null, {
          message: 'Retrieved successfully',
        });
      });
    });

    it('listArea function error', async function () {
      const result = await areaService.listArea();
      expect(result.errorMessage).toContain("Internal error.");
    });
  });
});
