import { IsBoolean, IsOptional } from 'class-validator';
import { CreateClientInput } from './create-client.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {

    // TODO: lo comento porque no quiero darle la opcion de elegir que client actualizar, sino que se actualice el que corresponda al usuario logueado
    // @Field(() => ID)
    // client_id: number;
}
