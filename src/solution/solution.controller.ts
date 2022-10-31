import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { SolutionService } from './solution.service';
import { AddSolutionDto } from './dto/add-solution.dto';

@Controller('solution')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) { }

  @Post(':issueId/new')
  addSolution(@Param('issueId') issueId: string, @Body() addSolutionDto: AddSolutionDto) {
    return this.solutionService.addSolution(issueId, addSolutionDto);
  }

  @Get('/list')
  listSolution() {
    return this.solutionService.listSolution();
  }
}