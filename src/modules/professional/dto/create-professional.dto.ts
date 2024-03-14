import { IsDate, IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Type } from "class-transformer";
import { gender_options, fiscal_status } from "src/modules/common/enum"

export class CreateProfessionalDto {

    /**
     * Nombre del profesional
     * @example 'Juan'
     */
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    name: string;
    
    /**
     * Apellido del profesional
     * @example 'Pérez'
     */
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    last_name: string;
    
    /**
     * Genero
     * @example 'M'
     */
    @IsString()
    @IsIn(['m','M','f','F'])
    gender: gender_options
    
    /**
     * CUIT
     * @example '20345678901'
     */
    @IsOptional()
    @Matches("^[0-9]{11}") 
    cuit?: string 
    
    /**
     * Estado fiscal
     * @example 'monotributista'
     */
    @IsOptional()
    fiscal_status?: fiscal_status
   
    /**
     * Teléfono
     * @example '1123456789'
     */
    // TODO: Validar con regex
    @IsOptional()
    @MaxLength(30)
    phone?: string
    
    /**
     * Email
     * @example 'juan@gmail.com'
     */
    // TODO: Validar con regex
    @IsOptional()
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
    
    /**
     * Fecha de nacimiento
     * @example '1990-01-21'
     */
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    birthdate?: Date
   
    /**
     * Banco
     * @example 'Santander Río'
     */
    @IsOptional()
    @MaxLength(255)
    bank?: string
    
    /**
     * Número de cuenta
     * @example '123456789'
     */
    // TODO: Validar con regex
    @IsOptional()
    @MaxLength(50)
    bank_account?: string
    
    /**
     * CBU
     * @example '1234567891234567891234'
     */
    // TODO: Validar con regex
    @IsOptional()
    @MaxLength(23)
    cbu?: string
    
    /**
     * Alias
     * @example 'juanperez'
     */
    // TODO: Validar con regex
    @IsOptional()
    @MaxLength(50)
    alias?: string
    
    /**
     * Nota
     * @example 'Profesional con 10 años de experiencia'
     */
    @IsOptional()
    note?: string
}

