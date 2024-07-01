import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { fiscal_status } from 'src/modules/common/enums';

// CORREGIDO
@ObjectType()
export class Professional {

    @Field(() => ID)
    professional_id: number

    @Field(() => String, {nullable: true})
    cuit?: string
    
    @Field(() => fiscal_status, {nullable: true})
    fiscal_status?: fiscal_status
    
    @Field(() => Date, {nullable: true})
    birthdate?: Date

    @Field(() => String, {nullable: true})
    bank?: string

    @Field(() => String, {nullable: true})
    bank_account?: string

    @Field(() => String, {nullable: true})
    cbu?: string
    
    @Field(() => String, {nullable: true})
    alias?: string

    @Field(() => Date)
    created_at: Date

    @Field(() => Date)
    updated_at: Date
}
