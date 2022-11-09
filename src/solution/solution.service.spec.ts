import { SolutionController } from './solution.controller';
import { SolutionService } from './solution.service';
import { DatabaseService } from '../db/db.service'
import * as AWS from 'aws-sdk-mock';

describe('SolutionService', () => {

    process.env.BOB_TABLE = 'awsuseast1-devcpidboingsw-bob';
    process.env.region = 'us-east-1';
    let databaseService: DatabaseService;
    let solutionController: SolutionController;
    let solutionService: SolutionService;

    beforeEach(() => {
        solutionService = new SolutionService(databaseService);
        solutionController = new SolutionController(solutionService);
    });

    describe('addSolution', () => {
        it('should add the solution', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'put', function (params: any, callback: any) {
                return callback(null, 'Success');
            });
        });
    });
});