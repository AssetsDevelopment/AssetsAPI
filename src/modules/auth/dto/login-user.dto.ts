import { MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    /**
     * Email
     * @example 'user1@gmail.com'
     */
    // TODO: Validar con regex
    @MinLength(12)
    @MaxLength(255)
    email?: string
    
    /**
     * Contraseña
     * @example 'pppppppp'
     */
    // TODO: Validar con regex
    @MaxLength(255)
    password: string
}
