import { gender_options } from "@prisma/client";
import { IsIn, IsNumber, IsPositive, IsString, Matches, Max, MaxLength, MinLength } from "class-validator";

export class CreatePatientDto {

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
     * Foreign Key de la empresa
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    company_fk: number;

    /**
     * Nombre del paciente
     * @example 'Juan'
     */
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    name: string;

    /**
     * Obra social
     * @example 'Juan'
     */
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    healthcare_provider: string;

    /**
     * Genero
     * @example 'M'
     */
    @IsString()
    @IsIn(['m','M','f','F'])
    gender: gender_options;
}
