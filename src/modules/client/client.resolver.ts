import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { CreateClientInput, UpdateClientInput } from './dto';
import { Auth, CurrentUser } from '../auth/decorators';
import { user_types } from '../auth/enums/user_types.enum';
import { User } from '../user/entities/user.entity';

@Resolver(() => Client)
export class ClientResolver {

    constructor(
        private readonly clientService: ClientService
    ) {}

    @Auth(user_types.clientAdmin)
    @Query(() => Client, { name: 'Client' })
    async Client(
        @CurrentUser('client_fk') client_id: User['client_fk']
    ): Promise<Client> {

        return this.clientService.findOneByUnique({
            clientWhereUniqueInput: {client_id}
        })
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => Client, { name: 'updateClient' })
    async updateClient(
        @Args('updateClientInput') updateClientInput: UpdateClientInput,
        @CurrentUser('client_fk') client_id: User['client_fk']
    ): Promise<Client> {

        return this.clientService.update({
            where: {client_id},
            data: updateClientInput
        })
    }
}
