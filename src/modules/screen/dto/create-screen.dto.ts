import { IsBoolean, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class CreateScreenDto {

    /**
     * Nombre del usuario
     * @example 'Juan'
     */
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    name: string;

    /**
     * Estado del usuario
     * @example true
     */
    @IsBoolean()
    @IsOptional()
    is_active: boolean;
}
