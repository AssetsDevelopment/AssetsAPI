import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { user_types } from 'src/modules/auth/enums/user_types.enum';
import { fiscal_status, gender_options } from 'src/modules/common/enums';

@ObjectType()
export class Professional {

    @Field(() => ID)
    professional_id: number

    @Field(() => String)
    name: string

    @Field(() => String)
    last_name: string

    @Field(() => gender_options)
    gender: gender_options

    @Field(() => String)
    cuit: string
    
    @Field(() => fiscal_status)
    fiscal_status: fiscal_status
    
    @Field(() => String)
    phone: string
    
    @Field(() => String)
    email: string

    password: string

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

    @Field(() => String)
    note: string

    @Field(() => Boolean)
    is_active: boolean

    @Field(() => user_types)
    user_type: user_types

    @Field(() => Date)
    created_at: Date

    @Field(() => Date)
    updated_at: Date
}
