import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { DatabaseService } from '../db/db.service';

@Module({
  controllers: [AreaController],
  providers: [AreaService, DatabaseService],
  exports: [AreaService],
})
export class AreaModule {}
