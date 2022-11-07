import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) { }

  @Post('/new')
  createIssue(@Body() createIssueDto: CreateIssueDto) {
    return this.issueService.createIssue(createIssueDto);
  }

  @Get('/list')
  listIssue() {
    return this.issueService.listIssue();
  }

  @Post()
  searchIssue(@Body() solutionDetail: string) {
    return this.issueService.searchIssue(solutionDetail);
  }
}