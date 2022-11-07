import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { SearchIssueDto } from './dto/search-issue.dto';

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
  searchIssue(@Body() searchIssueDto: SearchIssueDto) {
    return this.issueService.searchIssue(searchIssueDto);
  }
}