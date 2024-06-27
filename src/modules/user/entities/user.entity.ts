import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { user_types } from 'src/modules/auth/enums/user_types.enum';

@ObjectType()
export class User {

    @Field(() => ID)
    user_id: number

    @Field(() => Int)
    client_fk: number

    @Field(() => String)
    name: string

    @Field(() => String)
    last_name: string

    @Field(() => String)
    email: string

    password: string

    @Field(() => Boolean)
    is_admin: boolean

    @Field(() => Boolean)
    is_active: boolean

    @Field(() => user_types)
    user_type: user_types

    @Field(() => Date)
    created_at: Date

    @Field(() => Date)
    updated_at: Date
}
