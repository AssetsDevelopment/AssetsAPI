import { IsBoolean, IsNumber, IsOptional, IsPositive, Matches, Max, MaxLength, MinLength } from "class-validator";

export class CreateCompanyDto {

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
     * Nombre de la empresa
     * @example 'Juan'
     */
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    name: string;

    /**
     * CUIT
     * @example '20345678901'
     */
    @IsOptional()
    @Matches("^[0-9]{11}") 
    cuit?: string;

    /**
     * Nota
     * @example 'Nota de la empresa'
     */
    @IsOptional()
    note?: string;

    /**
     * Estado de la empresa
     * @example true
     */
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
