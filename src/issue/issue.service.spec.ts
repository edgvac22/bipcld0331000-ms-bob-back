import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { DatabaseService } from '../db/db.service'
import * as AWS from 'aws-sdk-mock';
import { CreateIssueDto } from './dto/create-issue.dto';
import { SearchIssueDto } from './dto/search-issue.dto';

describe('SolutionService', () => {

    process.env.BOB_TABLE = 'awsuseast1-devcpidboingsw-bob';
    process.env.region = 'us-east-1';
    let databaseService: DatabaseService;
    let issueService: IssueService;
    let createIssueDto: CreateIssueDto;
    let searchIssueDto: SearchIssueDto;

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

    describe('searchIssue', () => {
        
        it('should return a response depends of detailIssue', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'query', function (params, callback: any) {
                return callback(null, {
                    message: "Retrieved successfully"
                });
            });
        });

        it('searchIssue function error', async function () {
            const result = await issueService.searchIssue(searchIssueDto);
            expect(result.errorCode).toContain("SERVINGSW03");
        });
    });
});