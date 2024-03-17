import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsDecimal, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateOrderDto {

    /**
     * Foreign Key del pedido
     * @example 1
     */
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    order_fk?: number;

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
     * Foreign Key del paciente
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    patient_fk: number;

    /**
     * Foreign Key de la prestacion
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    treatment_fk: number;

    /**
     * Foreign Key del profesional
     * @example 1
     */
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    professional_fk?: number;

    /**
     * Fecha de inicio
     * @example '2021-01-01'
     */
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    start_date: Date;

    /**
     * Fecha de finalizacion
     * @example '2021-01-01'
     */
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    finish_date: Date;

    /**
     * Indica si tiene orden medica
     * @example true
     */
    @IsBoolean()
    has_medical_order: boolean;

    /**
     * Indica la frecuencia del pedido
     * @example true
     */
    @IsNumber()
    @Min(1)
    @Max(7)
    frequency: number

    /**
     * Indica el total de sesiones
     * @example 10
     */
    @IsNumber()
    @IsPositive()
    total_sessions: number;

    /**
     * Indica la sesiones realizadas
     * @example 10
     */
    @IsNumber()
    @IsPositive()
    sessions: number;

    /**
     * Indica el valor del coseguro
     * @example 1000
     */
    @IsDecimal()
    @IsPositive()
    @Max(99999.99)
    coinsurance: number;

    /**
     * Indica el valor especial del pedido
     * @example 1000
     */
    @IsDecimal()
    @IsPositive()
    @Max(99999.99)
    value: number;

    /**
     * Indica el costo especial del pedido
     */
    @IsDecimal()
    @IsPositive()
    @Max(99999.99)
    cost: number;

    /**
     * Indica el diagnostico del paciente
     */
    @IsOptional()
    @IsString()
    diagnosis?: string;

    /**
     * Indica los requerimientos especiales del pedido
     */
    @IsOptional()
    @IsString()
    requirements?: string;

    /**
     * Estado del pedido
     * @example true
     */
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

}
