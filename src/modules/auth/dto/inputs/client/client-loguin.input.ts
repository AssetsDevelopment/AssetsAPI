import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";

@InputType()
export class ClientLoguinInput {

    @Field( () => String )
    // TODO: Validar con regex
    @MinLength(12)
    @MaxLength(255)
    email: string;
    
    @Field( () => String )
    // TODO: Validar con regex
    @MaxLength(255)
    password: string;
}