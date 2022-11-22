import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { SolutionService } from './solution.service';
import { AddSolutionDto } from './dto/add-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Controller('solution')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) { }

  @Post('/new/:issueId')
  addSolution(@Param('issueId') issueId: string, @Body() addSolutionDto: AddSolutionDto) {
    return this.solutionService.addSolution(issueId, addSolutionDto);
  }

  @Get('/list')
  listSolution() {
    return this.solutionService.listSolution();
  }

  @Post('/update/:issueId')
  updateSolution(@Param('issueId') issueId: string, @Body() updateSolutionDto: UpdateSolutionDto) {
    return this.solutionService.updateSolution(issueId, updateSolutionDto);
  }

  @Post('/remove/:issueId')
  removeSolution(@Param('issueId') issueId: string) {
    return this.solutionService.removeSolution(issueId);
  }

  @Get(':solutionId')
  detailSolution(@Param('solutionId') solutionId: string) {
    return this.solutionService.detailSolution(solutionId);
  }
}