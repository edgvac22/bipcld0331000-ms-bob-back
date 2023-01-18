import { IssueService } from './issue.service';
import { DatabaseService } from '../db/db.service'
import * as AWS from 'aws-sdk-mock';
import { CreateIssueDto } from './dto/create-issue.dto';

describe('SolutionService', () => {

    let databaseService: DatabaseService;
    let issueService: IssueService;
    let createIssueDto: CreateIssueDto;
    let issueId: "aksjdfk-12313-askdfj";
    const files: any[] = [
        { fieldname: 'file1', originalname: 'file1.jpg', buffer: Buffer.from('file1'), mimetype: 'image/jpg', size: 5 },
        { fieldname: 'file2', originalname: 'file2.jpg', buffer: Buffer.from('file2'), mimetype: 'image/jpg', size: 5 },
    ];
    let id: "asjdfkajsdf-asdfasdf-123123"

    beforeEach(() => {
        issueService = new IssueService(databaseService);
    });

    describe('createIssue', () => {

        it('should create an issue', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'put', function (params: any, callback: any) {
                return callback(null, {
                    statusCode: 201,
                    messageType: "OK Request",
                    message: "Issue created successfully.",
                });
            });
        });

        it('createIssue function error', async function () {
            const result = await issueService.createIssue(createIssueDto);
            expect(result.errorCode).toContain("SERVINGSW01");
        });
    });

    describe('listIssue', () => {

        it('should return issue list', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'query', function (params: any, callback: any) {
                return callback(null, {
                    message: 'Retrieved successfully',
                });
            });
        });

        it('listIssue function error', async function () {
            const result = await issueService.listIssue();
            expect(result.errorCode).toContain("SERVINGSW02");
        });
    });

    describe('getIssue', () => {

        it('should return info of an specific issue', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'get', function (params: any, callback: any) {
                return callback(null, {
                    message: 'Retrieved successfully',
                });
            });
        });

        it('getIssue function error', async function () {
            const result = await issueService.getIssue(issueId);
            expect(result.errorCode).toContain("SERVINGSW09");
        });
    });

    describe('uploadIssueFile', () => {
        it('should upload the file', async () => {
            const result = await issueService.uploadIssueFile(files[0].originalname, files[0].buffer, issueId);
            expect(result.errorCode).toContain("SERVINGSW26");
        });
    });

    describe('getIssueImages', () => {
        it('should get the images of a bucket', async () => {
            const result = await issueService.getIssueImages(id);
            expect(result.msg).toContain("Retrieved successfully");
        });
    });
});