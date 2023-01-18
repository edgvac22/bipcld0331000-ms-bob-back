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
                Bucket: 'example',
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
                statusCode: 400,
                messageType: "Bad Request",
                errorCode: "SERVINGSW26",
                errorMessage: "ERROR issue",
                detail: "ERROR uploadFile function"
            });
        });
    });

    // it('should return a list of file URLs', async () => {
    //     const fileId = 'file-id';

    //     s3Mock.listObjects.mockResolvedValue({
    //         Contents: [{ Key: 'issue/file-id/image1.png' }, { Key: 'issue/file-id/image2.png' }],
    //     });
    //     s3Mock.getSignedUrl.mockReturnValue('https://example.com/image1.png');

    //     const result = await s3Service.getIssueImages(fileId);

    //     expect(result).toEqual({
    //         msg: 'Retrieved successfully',
    //         fileUrls: ['https://example.com/image1.png', 'https://example.com/image2.png'],
    //     });
    //     expect(s3Mock.listObjects).toHaveBeenCalledWith({
    //         Bucket: 'plantilla-s3-prueba-ingsw',
    //         Prefix: `issue/${fileId}/`,
    //     });
    //     expect(s3Mock.getSignedUrl).toHaveBeenCalledWith('getObject', {
    //         Bucket: 'plantilla-s3-prueba-ingsw',
    //         Key: 'issue/file-id/image1.png',
    //     });
    //     expect(s3Mock.getSignedUrl).toHaveBeenCalledWith('getObject', {
    //         Bucket: 'plantilla-s3-prueba-ingsw',
    //         Key: 'issue/file-id/image2.png',
    //     });
    // });

    // it('should return an error if the S3 listObjects call fails', async () => {
    //     const fileId = 'file-id';

    //     s3Mock.listObject.mockRejectedValue(new Error('S3 error'));

    //     const result = await s3Service.getIssueImages(fileId);

    //     expect(result).toEqual({
    //         statusCode: 400,
    //         messageType: "Bad Request",
    //         errorCode: "SERVINGSW25",
    //         errorMessage: "ERROR issue",
    //         detail: "ERROR getIssueImages function"
    //     });
    //     expect(s3Mock.listObjects).toHaveBeenCalledWith({
    //         Bucket: 'plantilla-s3-prueba-ingsw',
    //         Prefix: `issue/${fileId}/`,
    //     });
    //     expect(s3Mock.getSignedUrl).not.toHaveBeenCalled();
    // });
});