import { CreateClienthasprofessionalInput } from './create-clienthasprofessional.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClienthasprofessionalInput extends PartialType(CreateClienthasprofessionalInput) {
  @Field(() => Int)
  id: number;
}
