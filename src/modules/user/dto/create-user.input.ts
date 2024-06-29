import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsPositive, Matches, Max, MaxLength, MinLength } from 'class-validator';
import { user_types } from 'src/modules/auth/enums/user_types.enum';

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
    
    // TODO: Validar con regex
    @Field(() => String)
    @MinLength(12)
    @MaxLength(255)
    email: string
    
    // TODO: Validar con regex
    @Field(() => String)
    @MaxLength(255)
    password: string
}
