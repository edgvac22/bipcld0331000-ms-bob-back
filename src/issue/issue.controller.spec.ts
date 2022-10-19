import { Test } from '@nestjs/testing';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';

describe('IssueController', () => {
  let issueController: IssueController;
  let issueService: IssueService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [IssueController],
      providers: [IssueService],
    }).compile();

    issueService = await moduleRef.resolve(IssueService);

    issueService = moduleRef.get<IssueService>(IssueService);
    issueController = moduleRef.get<IssueController>(IssueController);
  });

  describe('create', () => {
    it('should create an issue', async () => {
      const createIssueDto: CreateIssueDto = {
        issueUser: "mmoreno",
        area: "Devops",
        environment: "Produccion",
        issueDetail: "Tengo un error en AWS en produccion",
        issueAttachment: [
            "error-produccion.png"
            ],
        dateCreate: "022-09-28:13:27:41",
        verify: "no",
      };
      expect(await issueController.create(createIssueDto)).toBeDefined();
    });
  });
});

