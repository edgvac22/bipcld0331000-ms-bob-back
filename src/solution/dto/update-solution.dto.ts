import { IsString, MinLength } from 'class-validator';

let msg: 'Error introducing parameters.'

export class UpdateSolutionDto {
  @IsString({
    message: msg
  })
  @MinLength(6, {
    message: msg
  })
  solutionTitle: string;

  @IsString({
    message: msg
  })
  @MinLength(21, {
    message: msg
  })
  solutionDetail: string;
}