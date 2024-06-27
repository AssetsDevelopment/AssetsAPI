import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ClientSignupInput {

    @Field( () => Number )
    client_fk: number;

    @Field( () => String )
    name: string;
    
    @Field( () => String )
    last_name: string;
    
    @Field( () => String )
    email: string;
    
    @Field( () => String )
    password: string;
}