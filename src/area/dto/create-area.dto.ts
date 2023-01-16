import { IsDefined, IsString } from "class-validator";

export class CreateAreaDto {
    @IsDefined({
        message: 'El campo nombre debe estar definido.'
    })
    @IsString({
        message: 'El campo nombre debe ser cadena o string.',
    })
    name: string;
}