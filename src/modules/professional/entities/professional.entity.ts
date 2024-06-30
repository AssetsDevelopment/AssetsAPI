import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { fiscal_status, gender_options } from 'src/modules/common/enums';

// CORREGIDO
@ObjectType()
export class Professional {

    @Field(() => ID)
    professional_id: number

    @Field(() => String)
    name: string;

    @Field(() => String)
    last_name: string;

    @Field(() => gender_options)
    gender: gender_options;

    @Field(() => String)
    cuit: string
    
    @Field(() => fiscal_status)
    fiscal_status: fiscal_status
    
    @Field(() => Date)
    birthdate: Date

    @Field(() => String)
    bank: string

    @Field(() => String)
    bank_account: string

    @Field(() => String)
    cbu: string
    
    @Field(() => String)
    alias: string

    @Field(() => Date)
    created_at: Date

    @Field(() => Date)
    updated_at: Date
}
