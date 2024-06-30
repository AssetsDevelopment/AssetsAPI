import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClienthasprofessionalInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
