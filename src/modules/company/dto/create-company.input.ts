import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateCompanyInput {

    @Field(() => String)
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @Field(() => String, {nullable: true})
    @IsOptional()
    @Matches("^[0-9]{11}") 
    cuit?: string

    @Field(() => String, {nullable: true})
    @IsOptional()
    @IsString()
    note?: string;
}