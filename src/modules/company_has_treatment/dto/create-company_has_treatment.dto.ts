import { IsDecimal, IsNumber, IsPositive, Max } from "class-validator";

export class CreateCompanyHasTreatmentDto {

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
     * Foreign Key de la prestación
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    treatment_fk: number;

    /**
     * Valor de la prestación
     * @example 100
     */
    @IsDecimal()
    @IsPositive()
    @Max(9999999.99)
    value: number;

}
