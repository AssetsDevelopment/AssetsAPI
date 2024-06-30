import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { user_types } from 'src/modules/auth/enums/user_types.enum';
import { Professional } from 'src/modules/professional/entities/professional.entity';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Clienthasprofessional {

    @Field(() => ID)
    client_fk: number;

    @Field(() => ID)
    professional_fk: number;

    @Field(() => user_types)
    sender: user_types;

    @Field(() => Boolean)
    is_accept: boolean;

    @Field(() => Boolean)
    is_active: boolean;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;

    @Field(() => User)
    User: User

    @Field(() => Professional)
    Professional: Professional
    
    // @Field(() => ID)
    // client_fk: number;

    // @Field(() => ID)
    // professional_fk: number;

    // @Field(() => user_types)
    // sender: user_types;

    // @Field(() => Boolean)
    // is_accept: boolean;

    // @Field(() => Boolean)
    // is_active: boolean;
    
    // @Field(() => Date)
    // created_at: Date;

    // @Field(() => Date)
    // updated_at: Date;
}
