import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { CreateClientInput, UpdateClientInput } from './dto';
import { Auth, CurrentUser } from '../auth/decorators';
import { user_types } from '../auth/enums/user_types.enum';
import { UserAuth } from '../auth/entities/user-auth.entity';

@Resolver(() => Client)
export class ClientResolver {

    constructor(
        private readonly clientService: ClientService
    ) {}

    @Auth(user_types.client)
    @Query(() => Client, { name: 'findClient' })
    async findClient(
        @CurrentUser('id') user_id: UserAuth['id']
    ): Promise<Client> {
        return this.clientService.findClintByUserId({
            userWhereUniqueInput: {user_id}
        });
    }

    @Auth(user_types.client)
    @Mutation(() => Client, { name: 'updateClient' })
    async updateClient(
        @Args('updateClientInput') updateClientInput: UpdateClientInput,
        @CurrentUser('id') user_id: UserAuth['id']
    ): Promise<Client> {

        return this.clientService.updateClintByUserId({
            where: {user_id},
            data: updateClientInput
        });
    }
}
