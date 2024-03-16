import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, MinLength } from "class-validator";

export class CreateTreatmentDto {

    /**
     * Foreign Key del cliente
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    client_fk: number;
    
    /**
     * Foreign Key del usuario
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    user_fk: number;

    /**
     * Nombre de la prestación
     * @example 'Juan'
     */
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(10)
    @MaxLength(100)
    name: string;
    
    /**
     * Abreviacion de la prestación
     * @example 'Juan'
     */
    // TODO: Validar con regex
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    abbreviation: string;
    
    /**
     * Descripción de la prestación
     * @example 'Juan'
     */
    @IsString()
    description: string;

    /**
     * Estado del prestacion
     * @example true
     */
    @IsOptional()
    @IsBoolean()
    is_active: boolean;
}
