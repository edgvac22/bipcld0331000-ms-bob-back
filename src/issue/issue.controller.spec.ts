import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../db/db.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { v4 as uuid } from 'uuid';

describe('AppController', () => {
    let issueController: IssueController;
    let issueService: IssueService;
    let createIssueDto: CreateIssueDto;
    let issueId: 'ksjafdkj-123123-asdfkjasdk'

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
                        getIssue: jest.fn().mockReturnValue('Retrieved successfully'),
                        getIssueImages: jest.fn().mockReturnValue('Retrieved successfully'),
                        uploadIssueFile: jest.fn().mockReturnValue('Uploaded successfully'),
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

    describe('getIssue', () => {
        it('should return "Retrieved successfully"', () => {
            issueService.getIssue = jest.fn().mockReturnValueOnce('Retrieved successfully');
            expect(issueController.getIssue(issueId)).toBe('Retrieved successfully');
        });
    });

    describe('getIssueImages', () => {
        it('should return "Retrieved successfully"', () => {
            issueService.getIssueImages = jest.fn().mockReturnValueOnce('Retrieved successfully');
            expect(issueController.getIssueImages(issueId)).toBe('Retrieved successfully');
        });
    });

    it('should upload files to S3', async () => {
        jest.spyOn(issueService, 'uploadIssueFile').mockImplementation();

        const files: any[] = [
            { fieldname: 'file1', originalname: 'file1.jpg', buffer: Buffer.from('file1'), mimetype: 'image/jpg', size: 5 },
            { fieldname: 'file2', originalname: 'file2.jpg', buffer: Buffer.from('file2'), mimetype: 'image/jpg', size: 5 },
        ];

        const result = await issueController.uploadIssueFile(files);

        expect(issueService.uploadIssueFile).toHaveBeenCalledTimes(2);
        expect(result).toEqual({
            msg: 'Los archivos se han sido subido exitosamente',
            statusCode: 201,
            length: 2,
            idFile: expect.any(String),
        });
    });
});