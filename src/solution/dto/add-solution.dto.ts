import { IsString, IsArray, IsOptional, MinLength, IsDefined } from 'class-validator';

export class AddSolutionDto {
  @IsDefined({
    message: 'El usuario que creo la Solución debe estar definido.'
  })
  @IsString({
    message: 'El usuario que creo la Solución debe ser cadena o string.',
  })
  solutionUser: string;

  @IsDefined({
    message: 'El título de la Solución debe estar definido.'
  })
  @IsString({
    message: 'El título de la Solución debe ser cadena o string.',
  })
  @MinLength(6, {
    message: 'El título de la Solución debe ser superior a 5 caracteres.',
  })
  solutionTitle: string;

  @IsDefined({
    message: 'El detalle de la Solución debe estar definido.'
  })
  @IsString({
    message: 'El detalle de la Solución debe ser cadena o string.',
  })
  @MinLength(21, {
    message: 'El detalle de la Solución debe ser superior a 20 caracteres.',
  })
  solutionDetail: string;
}