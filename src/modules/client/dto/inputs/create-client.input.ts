import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateClientInput {

    @Field(() => String)
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    name: string;
    
    @Field(() => String)
    @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
    @MinLength(2)
    @MaxLength(100)
    last_name: string;
}
