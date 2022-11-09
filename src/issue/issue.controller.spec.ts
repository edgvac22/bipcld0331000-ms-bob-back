import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../db/db.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { SearchIssueDto } from './dto/search-issue.dto';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';

describe('AppController', () => {
    let issueController: IssueController;
    let issueService: IssueService;
    let createIssueDto: CreateIssueDto;
    let searchIssueDto: SearchIssueDto;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [IssueController],
            providers: [IssueService, DatabaseService,
                {
                    provide: IssueService,
                    useValue: {
                        createIssue: jest.fn().mockReturnValue('Issue created successfully.'),
                        listIssue: jest.fn().mockReturnValue('Retrieved successfully'),
                        searchissue: jest.fn().mockReturnValue('Retrieved successfully'),
                    },
                },
            ],
        }).compile();

        issueController = app.get<IssueController>(IssueController);
        issueService = app.get<IssueService>(IssueService);
    });

    describe('createIssue', () => {
        it('should return "Issue created successfully"', () => {
            issueService.createIssue = jest.fn().mockReturnValueOnce('Issue created successfully.');
            expect(issueController.createIssue(createIssueDto)).toBe('Issue created successfully.');
        });
    });

    describe('listIssue', () => {
        it('should return "Retrieved successfully"', () => {
            issueService.listIssue = jest.fn().mockReturnValueOnce('Retrieved successfully');
            expect(issueController.listIssue()).toBe('Retrieved successfully');
        });
    });

    describe('searchIssue', () => {
        it('should return "Retrieved successfully"', () => {
            issueService.searchIssue = jest.fn().mockReturnValueOnce('Retrieved successfully');
            expect(issueController.searchIssue(searchIssueDto)).toBe('Retrieved successfully');
        });
    });
});