import { SolutionService } from './solution.service';
import { DatabaseService } from '../db/db.service'
import * as AWS from 'aws-sdk-mock';
import { AddSolutionDto } from './dto/add-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { S3 } from 'aws-sdk';

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
    let s3UploadMock: any;

    beforeEach(() => {
        solutionService = new SolutionService(databaseService);
    });

    beforeAll(() => {
        s3UploadMock = jest.spyOn(S3.prototype, 'upload');
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
        it('should return a success message and the S3 data when the upload is successful', async () => {
            const fileName = 'example.txt';
            const dataBuffer = Buffer.from('example data');
            const id = '123';
            const s3Data = { Location: 'https://example.com/example.txt' };

            s3UploadMock.mockImplementation((params: any) => {
                return { promise: () => Promise.resolve(s3Data) };
            });

            const response = await solutionService.uploadSolutionFile(fileName, dataBuffer, id);

            expect(response).toEqual({
                msg: 'Uploaded successfully',
                data: s3Data,
            });
            expect(s3UploadMock).toHaveBeenCalledWith({
                Bucket: 'plantilla-s3-prueba-ingsw',
                Body: dataBuffer,
                Key: expect.stringMatching(/solution\/123\/.+-example.txt/),
                ACL: 'public-read'
            });
        });

        it('should return an error when the upload fails', async () => {
            const fileName = 'example.txt';
            const dataBuffer = Buffer.from('example data');
            const id = '123';
            s3UploadMock.mockImplementation((params: any) => {
                return { promise: () => Promise.reject(new Error('S3 error')) };
            });

            const response = await solutionService.uploadSolutionFile(fileName, dataBuffer, id);

            expect(response).toEqual({
                statusCode: 400,
                messageType: "Bad Request",
                errorCode: "SERVINGSW27",
                errorMessage: "ERROR solution",
                detail: "ERROR uploadSolutionFile function"
            });
        });
    });
});