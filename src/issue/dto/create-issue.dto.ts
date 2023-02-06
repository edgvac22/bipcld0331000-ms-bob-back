import { IsString, MinLength, IsDefined, IsOptional } from 'class-validator';

let msg: 'Error introducing parameters.'

export class CreateIssueDto {
  @IsDefined({
    message: msg
  })
  @IsString({
    message: msg
  })
  issueUser: string;

  @IsDefined({
    message: msg
  })
  @IsString({
    message: msg
  })
  area: string;

  @IsDefined({
    message: msg
  })
  @IsString({
    message: msg
  })
  environment: string;

  @IsDefined({
    message: msg
  })
  @IsString({
    message: msg
  })
  @MinLength(21, {
    message: msg
  })
  issueDetail: string;

  @IsOptional()
  @IsString({
    message: msg
  })
  fileId: string;
}