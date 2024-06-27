import { Field, InputType } from "@nestjs/graphql";
import { gender_options } from "src/modules/common/enums";

@InputType()
export class ProfessionalSignupInput {

    @Field( () => String )
    name: string;
    
    @Field( () => String )
    last_name: string;
    
    @Field( () => String, {nullable: true} )
    email?: string;

    @Field( () => String, {nullable: true} )
    phone?: string;
    
    @Field( () => String )
    password: string;

    @Field( () => gender_options )
    gender: gender_options 
}