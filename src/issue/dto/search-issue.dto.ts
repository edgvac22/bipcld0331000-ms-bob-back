import { IsString, MinLength } from 'class-validator';

export class SearchIssueDto {
    @IsString({
        message: 'El detalle del Hallazgo debe ser cadena o string.',
    })
    @MinLength(6, {
        message: 'El detalle del Hallazgo debe ser superior a 5 caracteres.',
    })
    detailIssue: string;
}

