import { SolutionController } from './solution.controller';
import { SolutionService } from './solution.service';
import { DatabaseService } from '../db/db.service'
import * as AWS from 'aws-sdk-mock';
import { AddSolutionDto } from './dto/add-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

describe('SolutionService', () => {

    process.env.BOB_TABLE = 'awsuseast1-devcpidboingsw-bob';
    process.env.region = 'us-east-1';
    let databaseService: DatabaseService;
    let solutionController: SolutionController;
    let solutionService: SolutionService;
    let addSolutionDto: AddSolutionDto;
    let updateSolutionDto: UpdateSolutionDto
    let issueId: "212319283-asdfasd-123kajs";
    let solutionId: "1231j-asdfasd-123kajs";

    beforeEach(() => {
        solutionService = new SolutionService(databaseService);
        solutionController = new SolutionController(solutionService);
    });

    describe('addSolution', () => {
        it('should add the solution', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'update', function (params: any, callback: any) {
                return callback(null, {
                    message: "Solution created successfully.",
                });
            });
        });
        it('addSolution function error', async function () {
            const result = await solutionService.addSolution(issueId, addSolutionDto);
            expect(result.errorCode).toContain("SERVINGSW04");
        });
    });

    describe('listSolution', () => {
        it('should return solution list', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'query', function (params: any, callback: any) {
                return callback(null, {
                    message: "Retrieved successfully.",
                });
            });
        });
        it('listSolution function error', async function () {
            const result = await solutionService.listSolution();
            expect(result.errorCode).toContain("SERVINGSW05");
        });
    });

    describe('updateSolution', () => {
        it('should update the solution', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'update', function (params: any, callback: any) {
                return callback(null, {
                    message: "Solution updated successfully.",
                });
            });
        });
        it('updateSolution function error', async function () {
            const result = await solutionService.updateSolution(issueId, updateSolutionDto);
            expect(result.errorCode).toContain("SERVINGSW06");
        });
    });

    describe('removeSolution', () => {
        it('should remove the solution', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'update', function (params: any, callback: any) {
                return callback(null, {
                    message: "Solution deleted successfully.",
                });
            });
        });
        it('removeSolution function error', async function () {
            const result = await solutionService.removeSolution(issueId);
            expect(result.errorCode).toContain("SERVINGSW07");
        });
    });

    describe('detailIssue', () => {
        it('should get issue detail', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'query', function (params: any, callback: any) {
                return callback(null, {
                    message: "Retrieved successfully",
                });
            });
        });
        it('detailIssue function error', async function () {
            const result = await solutionService.detailIssue(solutionId);
            expect(result.errorCode).toContain("SERVINGSW08");
        });
    });
});