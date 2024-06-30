import { ObjectType, Field, ID } from '@nestjs/graphql';
import { user_types } from 'src/modules/auth/enums/user_types.enum';
import { gender_options } from 'src/modules/common/enums';

// CORREGIDO
@ObjectType()
export class User {

    @Field(() => ID)
    user_id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => String)
    profile: string;

    @Field(() => String)
    phone: string

    @Field(() => String)
    email: string

    password: string

    @Field(() => gender_options)
    gender: gender_options;
    
    @Field(() => Boolean)
    is_active: boolean;

    @Field(() => [user_types])
    user_type: user_types[];

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;
}
