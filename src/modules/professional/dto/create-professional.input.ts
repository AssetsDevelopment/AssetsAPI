import { InputType, Int, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { fiscal_status, gender_options } from 'src/modules/common/enums';

@InputType()
export class CreateProfessionalInput {

    @Field(() => String)
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    name: string;
    
    @Field(() => String)
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    last_name: string;
    
    @Field(() => gender_options)
    @IsString()
    @IsIn(['m','M','f','F'])
    gender: gender_options
    
    @Field(() => String, { nullable: true })
    @IsOptional()
    @Matches("^[0-9]{11}") 
    cuit?: string 
    
    @Field(() => String, { nullable: true })
    @IsOptional()
    fiscal_status?: fiscal_status
    
    // TODO: Validar con regex
    @Field(() => String, { nullable: true })
    @IsOptional()
    @MaxLength(30)
    phone?: string
    
    // TODO: Validar con regex
    @Field(() => String, { nullable: true })
    @IsOptional()
    @MinLength(12)
    @MaxLength(255)
    email?: string
    
    // TODO: Validar con regex
    @Field(() => String)
    @MaxLength(255)
    password: string
    
    @Field(() => String, { nullable: true })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    birthdate?: Date
    
    @Field(() => String, { nullable: true })
    @IsOptional()
    @MaxLength(255)
    bank?: string
    
    // TODO: Validar con regex
    @Field(() => String, { nullable: true })
    @IsOptional()
    @MaxLength(50)
    bank_account?: string
    
    // TODO: Validar con regex
    @Field(() => String, { nullable: true })
    @IsOptional()
    @MaxLength(23)
    cbu?: string
    
    // TODO: Validar con regex
    @Field(() => String, { nullable: true })
    @IsOptional()
    @MaxLength(50)
    alias?: string
    
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    note?: string
}