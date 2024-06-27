import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, MaxLength, MinLength } from "class-validator";

@InputType()
export class ProfessionalLoguinInput {

    @Field( () => String, {nullable: true} )
    // TODO: Validar con regex
    @IsOptional()
    @MinLength(12)
    @MaxLength(255)
    email?: string;

    @Field( () => String, {nullable: true} )
    // TODO: Validar con regex
    @IsOptional()
    @MaxLength(30)
    phone?: string;
    
    @Field( () => String )
    // TODO: Validar con regex
    @MaxLength(255)
    password: string;
}