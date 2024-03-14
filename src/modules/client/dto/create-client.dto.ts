import { IsBoolean, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class CreateClientDto {

    /**
     * Nombre del cliente
     * @example 'Ricardo'
     */
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    name: string;

    /**
     * Estado del cliente
     * @example true
     */
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

}
