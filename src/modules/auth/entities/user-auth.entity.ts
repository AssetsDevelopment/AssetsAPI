import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { user_types } from '../enums/user_types.enum';

@ObjectType()
export class UserAuth {

    @Field(() => ID)
    id: any; // el id del cliente o profesional
    
    @Field(() => String)
    name: string;
    
    @Field(() => String)
    last_name: string;
    
    @Field(() => String)
    email: string;
    
    password: string;

    @Field(() => Boolean)
    is_active: boolean;

    @Field(() => user_types)
    user_type: user_types;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;
}
