import { IsInt } from 'class-validator';
import { CreateUserByClientInput } from './create-userByClient.input';
import { InputType, Field, Int, ID, OmitType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UpdateUserInput } from 'src/modules/user/dto';

@InputType()
export class UpdateUserByClientInput extends UpdateUserInput {
  
    // Esto sirve para omitir otro campo adicional, aparte de los que ya se omiten en el UpdateUserInput
    // export class UpdateUserByClientInput extends OmitType(UpdateUserInput, ['gender'] as const) {

    @Field(() => ID)
    @Type(() => Number)
    @IsInt()
    user_id: number
}
