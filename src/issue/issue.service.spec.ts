import { IssueService } from './issue.service';
import { DatabaseService } from '../db/db.service'
import * as AWS from 'aws-sdk-mock';
import { CreateIssueDto } from './dto/create-issue.dto';

describe('SolutionService', () => {

    let databaseService: DatabaseService;
    let issueService: IssueService;
    let createIssueDto: CreateIssueDto;
    let issueId: "aksjdfk-12313-askdfj";

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
});