import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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

    // TODO: @Auth(user_types.clientAdmin)
    @Query(() => Client, { name: 'Client' })
    async Client(
        @CurrentUser('user_id') client_id: User['user_id']
    ): Promise<Client> {

        return this.clientService.findOneByUnique({
            clientWhereUniqueInput: {client_id}
        })
    }

}
