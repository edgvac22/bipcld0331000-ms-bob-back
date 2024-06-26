import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../db/db.service';
import { AddSolutionDto } from './dto/add-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { SolutionController } from './solution.controller';
import { SolutionService } from './solution.service';

describe('AppController', () => {
    let solutionController: SolutionController;
    let solutionService: SolutionService;
    let addSolutionDto: AddSolutionDto;
    let updateSolutionDto: UpdateSolutionDto;
    let issueId: "aksjdfk-12313-askdfj";
    let solutionId: "aksdfjkas-12783-18273-ncajsdn"

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [SolutionController],
            providers: [SolutionService, DatabaseService,
                {
                    provide: SolutionService,
                    useValue: {
                        addSolution: jest.fn().mockReturnValue('Solution created successfully.'),
                        listSolution: jest.fn().mockReturnValue('Retrieved successfully'),
                        updateSolution: jest.fn().mockReturnValue('Solution updated successfully.'),
                        removeSolution: jest.fn().mockReturnValue('Solution deleted successfully.'),
                        detailSolution: jest.fn().mockReturnValue('Retrieved successfully'),
                        imageSolutionBucket: jest.fn().mockReturnValue('Retrieved successfully'),
                        uploadSolutionFile: jest.fn().mockReturnValue('Uploaded successfully'),
                        countSolutionBucket: jest.fn().mockReturnValue('Retrieved successfully.'),
                    },
                },
            ],
        }).compile();

        solutionController = app.get<SolutionController>(SolutionController);
        solutionService = app.get<SolutionService>(SolutionService);
    });

    describe('addSolution', () => {
        it('should return "Solution created successfully."', () => {
            solutionService.addSolution = jest.fn().mockReturnValueOnce('Solution created successfully.');
            expect(solutionController.addSolution(issueId, addSolutionDto)).toBe('Solution created successfully.');
        });
    });

    describe('listSolution', () => {
        it('should return "Retrieved successfully"', () => {
            solutionService.listSolution = jest.fn().mockReturnValueOnce('Retrieved successfully');
            expect(solutionController.listSolution()).toBe('Retrieved successfully');
        });
    });

    describe('updateSolution', () => {
        it('should return "Solution updated successfully."', () => {
            solutionService.updateSolution = jest.fn().mockReturnValueOnce('Solution updated successfully.');
            expect(solutionController.updateSolution(issueId, updateSolutionDto)).toBe('Solution updated successfully.');
        });
    });

    describe('removeSolution', () => {
        it('should return "Solution deleted successfully."', () => {
            solutionService.removeSolution = jest.fn().mockReturnValueOnce('Solution deleted successfully.');
            expect(solutionController.removeSolution(issueId)).toBe('Solution deleted successfully.');
        });
    });

    describe('detailSolution', () => {
        it('should get solution detail"', () => {
            solutionService.detailSolution = jest.fn().mockReturnValueOnce('Retrieved successfully');
            expect(solutionController.detailSolution(solutionId)).toBe('Retrieved successfully');
        });
    });

    it('should upload files to S3', async () => {
        jest.spyOn(solutionService, 'uploadSolutionFile').mockImplementation();

        const files: any[] = [
            { fieldname: 'file1', originalname: 'file1.jpg', buffer: Buffer.from('file1'), mimetype: 'image/jpg', size: 5 },
            { fieldname: 'file2', originalname: 'file2.jpg', buffer: Buffer.from('file2'), mimetype: 'image/jpg', size: 5 },
        ];
        const result = await solutionController.uploadSolutionFile(files, issueId);
        expect(solutionService.uploadSolutionFile).toHaveBeenCalledTimes(2);
        expect(result).toEqual({
            message: 'Uploaded successfully',
            messageType: 'OK Request',
            statusCode: 201,
            length: 2,
        });
    });

    describe('countSolutionBucket', () => {
        it('should return the number of objects in the bucket', async () => {
            const s3Mock = {
                listObjects: jest.fn().mockResolvedValue({
                    Contents: [{}, {}, {}]
                })
            };
            solutionService.s3 = s3Mock as any;
            const result = await solutionController.countSolutionBucket('issue-1');
            expect(result).toEqual("Retrieved successfully.");
        });
    });

    describe('imageSolutionBucket', () => {
        it('should return the number of objects in the bucket', async () => {
            const s3Mock = {
                listObjects: jest.fn().mockResolvedValue({
                    Contents: [{}, {}, {}]
                })
            };
            solutionService.s3 = s3Mock as any;
            const result = await solutionController.imageSolutionBucket('issue-1');
            expect(result).toEqual("Retrieved successfully");
        });
    });
});