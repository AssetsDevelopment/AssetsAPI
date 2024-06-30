import { InputType, Field } from '@nestjs/graphql';
import { CreateUserInput } from 'src/modules/user/dto';

@InputType()
export class CreateUserByClientInput extends CreateUserInput {}
