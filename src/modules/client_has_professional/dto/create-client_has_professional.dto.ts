import { IsBoolean, IsNumber, IsOptional, IsPositive, Max } from "class-validator";

export class CreateClientHasProfessionalDto {

    /**
     * Foreign Key del cliente
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    client_fk: number;
    
    /**
     * Foreign Key del profesional
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    professional_fk: number;
    
    /**
     * Estado de la relación
     * @example true
     */
    @IsOptional()
    @IsBoolean()
    is_active?: boolean
}
