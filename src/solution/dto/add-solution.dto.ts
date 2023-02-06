import { IsString, MinLength, IsDefined } from 'class-validator';

let msg: 'Error introducing parameters.'

export class AddSolutionDto {
  @IsDefined({
    message: msg
  })
  @IsString({
    message: msg
  })
  solutionUser: string;

  @IsDefined({
    message: msg
  })
  @IsString({
    message: msg
  })
  @MinLength(6, {
    message: msg
  })
  solutionTitle: string;

  @IsDefined({
    message: msg
  })
  @IsString({
    message: msg
  })
  @MinLength(21, {
    message: msg
  })
  solutionDetail: string;
}