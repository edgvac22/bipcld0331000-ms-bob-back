import { Controller, Get, Post, Body } from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post('/new')
  createArea(@Body() createAreaDto: CreateAreaDto) {
    return this.areaService.createArea(createAreaDto);
  }

  @Get('/list')
  listArea() {
    return this.areaService.listArea();
  }
}
