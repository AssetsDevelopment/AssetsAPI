import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Client {

    @Field(() => ID)
    client_id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => Boolean)
    is_active: boolean;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;
}
