import { Body, Controller, Post } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post()
  async create(@Body() createIssueDto: CreateIssueDto) {
    return await this.issueService.createIssue(createIssueDto);
  }
}