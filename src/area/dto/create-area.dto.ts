import { IsDefined, IsString } from "class-validator";

let msg: 'Error introducing parameters.'

export class CreateAreaDto {
    @IsDefined({
        message: msg
    })
    @IsString({
        message: msg
    })
    name: string;
}