import { SolutionService } from './solution.service';
import { DatabaseService } from '../db/db.service'
import * as AWS from 'aws-sdk-mock';
import { AddSolutionDto } from './dto/add-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

describe('SolutionService', () => {

    let databaseService: DatabaseService;
    let solutionService: SolutionService;
    let addSolutionDto: AddSolutionDto;
    let updateSolutionDto: UpdateSolutionDto
    let issueId: "212319283-asdfasd-123kajs";
    let solutionId: "1231j-asdfasd-123kajs";
    const files: any[] = [
        { fieldname: 'file1', originalname: 'file1.jpg', buffer: Buffer.from('file1'), mimetype: 'image/jpg', size: 5 },
        { fieldname: 'file2', originalname: 'file2.jpg', buffer: Buffer.from('file2'), mimetype: 'image/jpg', size: 5 },
    ];

    beforeEach(() => {
        solutionService = new SolutionService(databaseService);
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

    describe('detailSolution', () => {
        it('should get solution detail', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'query', function (params: any, callback: any) {
                return callback(null, {
                    message: "Retrieved successfully",
                });
            });
        });
        it('detailSolution function error', async function () {
            const result = await solutionService.detailSolution(solutionId);
            expect(result.errorCode).toContain("SERVINGSW08");
        });
    });

    describe('uploadSolutionFile', () => {
        it('should upload the file', async () => {
            const result = await solutionService.uploadSolutionFile(files[0].originalname, files[0].buffer, issueId);
            expect(result.errorCode).toContain("SERVINGSW27");
        });
    });

    describe('countSolutionBucket', () => {
        it('should count the size of a bucket', async () => {
            const result = await solutionService.countSolutionBucket(issueId);
            expect(result.errorCode).toContain("SERVINGSW28");
        });
    });

    describe('imageSolutionBucket', () => {
        it('should get the images of a bucket', async () => {
            const result = await solutionService.imageSolutionBucket(issueId);
            expect(result.errorCode).toContain("SERVINGSW29");
        });
    });
});