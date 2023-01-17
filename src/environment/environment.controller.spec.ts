import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../db/db.service'
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { EnvironmentController } from './environment.controller';
import { EnvironmentService } from './environment.service';

describe('EnvironmentController', () => {
    let environmentController: EnvironmentController;
    let environmentService: EnvironmentService;
    let createEnvironmentDto: CreateEnvironmentDto;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [EnvironmentController],
            providers: [EnvironmentService, DatabaseService,
                {
                    provide: EnvironmentService,
                    useValue: {
                        createEnvironment: jest.fn().mockReturnValue('Environment created successfully.'),
                        listEnvironment: jest.fn().mockReturnValue('Retrieved successfully'),
                    },
                },
            ],
        }).compile();

        environmentController = app.get<EnvironmentController>(EnvironmentController);
        environmentService = app.get<EnvironmentService>(EnvironmentService);
    });

    describe('createEnvironment', () => {
        it('should return "Environment created successfully."', () => {
            environmentService.createEnvironment = jest.fn().mockReturnValueOnce('Environment created successfully.');
            expect(environmentController.createEnvironment(createEnvironmentDto)).toBe('Environment created successfully.');
        });
    });

    describe('listEnvironment', () => {
        it('should return "Retrieved successfully"', () => {
            environmentService.listEnvironment = jest.fn().mockReturnValueOnce('Retrieved successfully');
            expect(environmentController.listEnvironment()).toBe('Retrieved successfully');
        });
    });
});
