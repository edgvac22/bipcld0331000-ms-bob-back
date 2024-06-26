import { IssueService } from './issue.service';
import { DatabaseService } from '../db/db.service'
import * as AWS from 'aws-sdk-mock';
import { CreateIssueDto } from './dto/create-issue.dto';
import { S3 } from 'aws-sdk';
import { Buffer } from 'buffer';

describe('SolutionService', () => {

    let databaseService: DatabaseService;
    let issueService: IssueService;
    let createIssueDto: CreateIssueDto;
    let issueId: "aksjdfk-12313-askdfj";
    const files: any[] = [
        { fieldname: 'file1', originalname: 'file1.jpg', buffer: Buffer.from('file1'), mimetype: 'image/jpg', size: 5 },
        { fieldname: 'file2', originalname: 'file2.jpg', buffer: Buffer.from('file2'), mimetype: 'image/jpg', size: 5 },
    ];
    let id: "123"
    let s3UploadMock: any;
    let s3Mock: any;
    let s3Service: IssueService;
    let fileId: "123"

    beforeEach(() => {
        issueService = new IssueService(databaseService);
        s3Mock = {
            listObjects: jest.fn(),
            getSignedUrl: jest.fn(),
        };
        s3Service = new IssueService(s3Mock);
    });

    beforeAll(() => {
        s3UploadMock = jest.spyOn(S3.prototype, 'upload');
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
            expect(result.errorMessage).toContain("Internal error.");
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
            expect(result.errorMessage).toContain("Internal error.");
        });
    });

    describe('detailIssue', () => {

        it('should return info of an specific issue', async () => {
            AWS.mock('DynamoDB.DocumentClient', 'get', function (params: any, callback: any) {
                return callback(null, {
                    message: 'Retrieved successfully',
                });
            });
        });

        it('detailIssue function error', async function () {
            const result = await issueService.detailIssue(issueId);
            expect(result.errorMessage).toContain("Internal error.");
        });
    });

    describe('uploadIssueFile', () => {
        it('should return a success message and the S3 data when the upload is successful', async () => {
            const fileName = 'example.txt';
            const dataBuffer = Buffer.from('example data');
            id = '123';
            const s3Data = { Location: 'https://example.com/example.txt' };

            s3UploadMock.mockImplementation((params: any) => {
                return { promise: () => Promise.resolve(s3Data) };
            });

            const response = await issueService.uploadIssueFile(fileName, dataBuffer, id);

            expect(response).toEqual({
                msg: 'Uploaded successfully',
                data: s3Data,
            });
            expect(s3UploadMock).toHaveBeenCalledWith({
                Bucket: 'plantilla-s3-prueba-ingsw',
                Body: dataBuffer,
                Key: expect.stringMatching(/issue\/123\/.+-example.txt/),
                ACL: 'public-read'
            });
        });

        it('should return an error when the upload fails', async () => {
            const fileName = 'example.txt';
            const dataBuffer = Buffer.from('example data');
            id = '123';
            s3UploadMock.mockImplementation((params: any) => {
                return { promise: () => Promise.reject(new Error('S3 error')) };
            });

            const response = await issueService.uploadIssueFile(fileName, dataBuffer, id);

            expect(response).toEqual({
                statusCode: 500,
                messageType: "Error",
                errorMessage: "Internal error.",
            });
        });
    });

    describe('getIssueImages', () => {
        it('should get the urls of a bucket', async () => {
            AWS.mock('S3', 'getSignedUrl', function (params: any, callback: any) {
                return callback(null, {
                    message: "Retrieved successfully",
                });
            });
        });
    });
});