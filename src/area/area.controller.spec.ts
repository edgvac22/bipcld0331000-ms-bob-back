import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../db/db.service';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';

describe('AreaController', () => {
  let areaController: AreaController;
  let areaService: AreaService;
  let createAreaDto: CreateAreaDto;

  beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
          controllers: [AreaController],
          providers: [AreaService, DatabaseService,
              {
                  provide: AreaService,
                  useValue: {
                      createArea: jest.fn().mockReturnValue('Area created successfully.'),
                      listArea: jest.fn().mockReturnValue('Retrieved successfully'),
                  },
              },
          ],
      }).compile();

      areaController = app.get<AreaController>(AreaController);
      areaService = app.get<AreaService>(AreaService);
  });

  describe('createArea', () => {
      it('should return "Area created successfully."', () => {
          areaService.createArea = jest.fn().mockReturnValueOnce('Area created successfully.');
          expect(areaController.createArea(createAreaDto)).toBe('Area created successfully.');
      });
  });

  describe('listArea', () => {
      it('should return "Retrieved successfully"', () => {
          areaService.listArea = jest.fn().mockReturnValueOnce('Retrieved successfully');
          expect(areaController.listArea()).toBe('Retrieved successfully');
      });
  });
});
