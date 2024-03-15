import { IsNumber, IsOptional, IsPositive, Max } from "class-validator"

export class CreatePermissionDto {

    /**
     * Foreign Key del usuario
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Max(2147483647)
    user_fk: number

    /**
     * Foreign Key del cliente
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Max(2147483647)
    client_fk: number

    /**
     * Foreign Key de la pantalla
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Max(2147483647)
    screen_fk: number
}
