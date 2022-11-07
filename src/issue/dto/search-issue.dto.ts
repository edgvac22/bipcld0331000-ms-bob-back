import { IsString, MinLength, IsDefined } from 'class-validator';

export class SearchIssueDto {
    @IsDefined({
        message: 'El campo detailIssue debe estar definido.'
    })
    @IsString({
        message: 'El detalle del Hallazgo debe ser cadena o string.',
    })
    @MinLength(6, {
        message: 'El detalle del Hallazgo debe ser superior a 5 caracteres.',
    })
    detailIssue: string;
}

