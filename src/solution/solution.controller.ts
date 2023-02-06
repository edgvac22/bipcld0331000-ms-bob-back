import { Body, Controller, Param, Post, Get, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { SolutionService } from './solution.service';
import { AddSolutionDto } from './dto/add-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  @Get('image/:issueId')
  imageSolutionBucket(@Param('issueId') issueId: string) {
    return this.solutionService.imageSolutionBucket(issueId);
  }

  @Post('file/:issueId')
  @UseInterceptors(FilesInterceptor('files', 10, {
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
  async uploadSolutionFile(@UploadedFiles() files: Express.Multer.File[], @Param('issueId') issueId: string) {
    const fileArray = [];
    for (const element of files) {
      this.solutionService.uploadSolutionFile(element.originalname, element.buffer, issueId);
      fileArray.push(element.filename);
    }
    return {
      statusCode: 201,
      messageType: 'OK Request',
      message: 'Uploaded successfully',
      length: fileArray.length,
    };
  }

  @Get('count/:issueId')
  countSolutionBucket(@Param('issueId') issueId: string) {
    return this.solutionService.countSolutionBucket(issueId);
  }
}