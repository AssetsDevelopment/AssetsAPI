import { MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    /**
     * Email
     * @example 'juan@gmail.com'
     */
    // TODO: Validar con regex
    @MinLength(12)
    @MaxLength(255)
    email?: string
    
    /**
     * Contraseña
     * @example 'JuanPerez123@'
     */
    // TODO: Validar con regex
    @MaxLength(255)
    password: string
}
