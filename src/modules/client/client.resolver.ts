import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { CreateClientInput, UpdateClientInput } from './dto';
import { Auth, CurrentUser } from '../auth/decorators';
import { user_types } from '../auth/enums/user_types.enum';
import { UserAuth } from '../auth/entities/user-auth.entity';

@Resolver(() => Client)
export class ClientResolver {
    constructor(private readonly clientService: ClientService) {}

    @Auth(user_types.client)
    @Query(() => Client, { name: 'findClient' })
    findClient(
        @CurrentUser('id') user_id: UserAuth['id']
    ): Promise<Client> {
        return this.clientService.findClintByUserId({
            user_id
        });
    }

    @Mutation(() => Client, { name: 'updateClient' })
    updateClient(
        @Args('updateClientInput') updateClientInput: UpdateClientInput
    ) {
        return this.clientService.update(updateClientInput.id, updateClientInput);
    }

//   @Mutation(() => Client)
//   removeClient(@Args('id', { type: () => Int }) id: number) {
//     return this.clientService.remove(id);
//   }
}
