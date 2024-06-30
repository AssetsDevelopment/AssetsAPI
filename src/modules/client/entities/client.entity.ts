import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

// CORREGIDO
@ObjectType()
export class Client {

    @Field(() => ID)
    client_id: number;

    @Field(() => Int, { nullable: true })
    client_fk?: number;

    @Field(() => Boolean)
    is_admin: boolean;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;
}
