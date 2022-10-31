import { Test } from '@nestjs/testing';
import { DatabaseService } from '../db/db.service';
import { Issue } from './interfaces/issue.interface';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';

describe('IssueController', () => {
  let issueController: IssueController;
  let issueService: IssueService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [IssueController],
      providers: [IssueService, DatabaseService],
    }).compile();

    issueService = await moduleRef.resolve(IssueService);

    issueService = moduleRef.get<IssueService>(IssueService);
    databaseService = moduleRef.get<DatabaseService>(DatabaseService);
    issueController = moduleRef.get<IssueController>(IssueController);
  });

  describe('Interface', () => {
    it('Cat should be defined', async () => {
      expect(Issue).toBeDefined();
    });
  });

  describe('Controller', () => {
    it('Controller should be defined', async () => {
      expect(IssueController).toBeDefined();
    });
  });
});