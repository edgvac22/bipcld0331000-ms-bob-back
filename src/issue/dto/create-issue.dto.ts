import { IsString, IsOptional, MinLength, IsDefined, IsArray } from 'class-validator';

export class CreateIssueDto {
  @IsDefined({
    message: 'El campo issueUser debe estar definido.'
  })
  @IsString({
    message: 'El usuario que creo el Hallazgo debe ser cadena o string.',
  })
  issueUser: string;

  @IsDefined({
    message: 'El campo area debe estar definido.',
  })
  @IsString({
    message: 'El Área de TI debe ser cadena o string.',
  })
  area: string;

  @IsDefined({
    message: 'El campo environment debe estar definido.'
  })
  @IsString({
    message: 'El ambiente de desarrollo debe ser cadena o string.',
  })
  environment: string;

  @IsDefined({
    message: 'El campo issueDetail debe estar definido.',
  })
  @IsString({
    message: 'El detalle del Hallazgo debe ser cadena o string.',
  })
  @MinLength(21, {
    message: 'El detalle del Hallazgo debe ser superior a 20 caracteres.',
  })
  issueDetail: string;

  @IsArray({
    message: 'El adjunto del Hallazgo debe ser un array',
  })
  @IsOptional()
  issueAttachment: object;
}