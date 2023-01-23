import { Body, Controller, Get, Post, Param, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';

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
  detailIssue(@Param('issueId') issueId: string) {
    return this.issueService.detailIssue(issueId);
  }

  @Get('image/:fileId')
  getIssueImages(@Param('fileId') fileId: string) {
    return this.issueService.getIssueImages(fileId);
  }

  @Post('file')
  @UseInterceptors(FilesInterceptor('files', 5, {
    limits: {
      fileSize: 1000000,
    },
    fileFilter: (req, file, callback) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  }))
  async uploadIssueFile(@UploadedFiles() files: Express.Multer.File[]) {
    const fileArray = [];
    const id = uuid();

    for (const element of files) {
      this.issueService.uploadIssueFile(element.originalname, element.buffer, id);
      fileArray.push(element.filename);
    }
    return {
      msg: 'Los archivos se han sido subido exitosamente',
      statusCode: 201,
      length: fileArray.length,
      idFile: id,
    };
  }
}