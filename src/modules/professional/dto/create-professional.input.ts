import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { fiscal_status } from 'src/modules/common/enums';

@InputType()
export class CreateProfessionalInput {

    @Field(() => String, { nullable: true })
    @IsOptional()
    @Matches("^[0-9]{11}") 
    cuit?: string 
    
    @Field(() => String, { nullable: true })
    @IsOptional()
    fiscal_status?: fiscal_status
    
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
}