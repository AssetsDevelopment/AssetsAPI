import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Company {

    @Field(() => ID)
    company_id: number;

    @Field(() => Int)
    client_fk: number;

    @Field(() => String)
    name: string;

    @Field(() => String, {nullable: true})
    cuit?: string

    @Field(() => String, {nullable: true})
    note?: string;

    @Field(() => Boolean)
    is_active: boolean;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;
}
