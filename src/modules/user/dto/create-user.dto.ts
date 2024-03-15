import { IsBoolean, IsNumber, IsOptional, IsPositive, Matches, Max, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    
    /**
     * Foreign Key del cliente
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    client_fk: number

    /**
     * Nombre del usuario
     * @example 'Juan'
     */
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    name: string

    /**
     * Email
     * @example 'juan@gmail.com'
     */
    // TODO: Validar con regex
    @MinLength(12)
    @MaxLength(255)
    email: string

    /**
     * Contraseña
     * @example 'JuanPerez123@'
     */
    // TODO: Validar con regex
    @MaxLength(255)
    password: string

    /**
     * Es admin
     * @example true
     */
    @IsOptional()
    @IsBoolean()
    is_admin?: boolean
    
    /**
     * Estado del usuario
     * @example true
     */
    @IsOptional()
    @IsBoolean()
    is_active?: boolean
}
