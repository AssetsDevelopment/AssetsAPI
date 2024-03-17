import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsIn, IsNumber, IsOptional, IsPositive, IsString, Max } from "class-validator";
import { urgency_options } from "src/modules/common/enum";

export class CreateClaimDto {

    /**
     * Foreign Key del pedido
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    order_fk: number;

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

    @IsString()
    cause: string;

    /**
     * Nivel de urgencia
     * @example 'M'
     */
    // TODO: resolver el tema de los enums. 1- cuales son los decoradores que se deben usar y si lo debo importar de prisma o de common
    @IsString()
    @IsIn(['baja','media','alta'])
    urgency: urgency_options;

    /**
     * Fecha de reporte
     * @example '1990-01-21'
     */
    @Type(() => Date)
    @IsDate()
    reported_date: Date;

    /**
     * Estado del reclamo
     * @example true
     */
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

}
