import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { DatabaseService } from '../db/db.service'
import * as AWS from 'aws-sdk-mock';

describe('SolutionService', () => {

    process.env.BOB_TABLE = 'awsuseast1-devcpidboingsw-bob';
    process.env.region = 'us-east-1';
    let databaseService: DatabaseService;
    let issueController: IssueController;
    let issueService: IssueService;

    beforeEach(() => {
        issueService = new IssueService(databaseService);
        issueController = new IssueController(issueService);
    });

    describe('createIssue', () => {
        it('should create an issue', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'put', function (params: any, callback: any) {
                return callback(null, 'Success');
            });
        });
    });
});