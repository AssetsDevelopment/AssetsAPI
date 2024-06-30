import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { user_types } from 'src/modules/auth/enums/user_types.enum';
import { gender_options } from 'src/modules/common/enums';

@InputType()
export class CreateUserInput {

    @Field(() => String)
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    name: string
    
    @Field(() => String)
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    last_name: string

    @Field(() => String)
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    profile: string

    // TODO: Validar con regex
    @Field(() => String, { nullable: true })
    @IsOptional()
    @MaxLength(30)
    phone?: string
    
    // TODO: Validar con regex
    @Field(() => String)
    @MinLength(12)
    @MaxLength(255)
    email: string
    
    // TODO: Validar con regex
    @Field(() => String)
    @MaxLength(255)
    password: string

    @Field(() => gender_options)
    @IsString()
    gender: gender_options
}
