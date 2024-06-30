import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { gender_options } from 'src/modules/common/enums';

// CORREGIDO
@ObjectType()
export class Client {

    @Field(() => ID)
    client_id: number;

    @Field(() => Int)
    client_fk: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => gender_options)
    gender: gender_options;

    @Field(() => Boolean)
    is_admin: boolean;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;
}
