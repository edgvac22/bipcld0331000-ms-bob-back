import { Body, Controller, Get, Post, Param } from '@nestjs/common';
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

  @Get(':issueId')
  getIssue(@Param('issueId') issueId: string) {
    return this.issueService.getIssue(issueId);
  }
}