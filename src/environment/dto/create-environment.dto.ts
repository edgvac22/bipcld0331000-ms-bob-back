import { IsDefined, IsString } from "class-validator";

export class CreateEnvironmentDto {
    @IsDefined()
    @IsString()
    name: string;
}