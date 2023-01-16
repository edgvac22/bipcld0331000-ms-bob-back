import { Controller, Get, Post, Body } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';

@Controller('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) { }

  @Post('/new')
  createEnvironment(@Body() createEnvironmentDto: CreateEnvironmentDto) {
    return this.environmentService.createEnvironment(createEnvironmentDto);
  }

  @Get('/list')
  listEnvironment() {
    return this.environmentService.listEnvironment();
  }
}
