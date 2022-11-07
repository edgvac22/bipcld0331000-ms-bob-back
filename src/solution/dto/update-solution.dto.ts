import { IsString, IsArray, IsOptional, MinLength } from 'class-validator';

export class UpdateSolutionDto {
  @IsString({
    message: 'El detalle de la Solución debe ser cadena o string.',
  })
  @MinLength(6, {
    message: 'El detalle de la Solución debe ser superior a 5 caracteres.',
  })
  solutionTitle: string;

  @IsArray({
    message: 'El adjunto de la Solución debe ser un array.',
  })
  @IsOptional()
  solutionAttachment: object;

  @IsString({
    message: 'El detalle de la Solución debe ser cadena o string.',
  })
  @MinLength(21, {
    message: 'El detalle de la Solución debe ser superior a 20 caracteres.',
  })
  solutionDetail: string;
}