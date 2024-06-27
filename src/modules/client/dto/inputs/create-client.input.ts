import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateClientInput {

     @Matches("^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+")
     @MinLength(2)
     @MaxLength(100)
     name: string;
 
     @IsOptional()
     @IsBoolean()
     is_active?: boolean;
}
