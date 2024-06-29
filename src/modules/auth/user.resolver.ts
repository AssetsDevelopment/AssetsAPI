import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { ClientLoguinInput } from './dto/inputs';

import { user_types } from './enums/user_types.enum';
import { Auth, CurrentUser } from './decorators';

import { UserResponse } from './types/user-response.type';
import { Client } from '../client/entities/client.entity';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { ClientService } from '../client/client.service';

@Resolver(() => UserResponse)
export class UserAuthResolver {

    constructor(
        private readonly authService: AuthService,
        private readonly clientService: ClientService,
    ) {}

    @Mutation(() => UserResponse, { name: 'loginClient' })
    async loginClient(
        @Args('loginInput') loginInput: ClientLoguinInput
    ): Promise<UserResponse> {
        return this.authService.loginClient(loginInput);
    }

    @Auth(user_types.client)
    @Query(() => UserResponse, { name: 'revalidateClientAuth' })
    revalidateClientToken(
        @CurrentUser() user: User
    ): UserResponse {
        return this.authService.revalidateClientToken(user);
    }
   
    @ResolveField(() => Client, {name: 'Client'})
    async findClient(
        @Parent() userResponse: UserResponse
    ): Promise<Client> {
        
        const { user } = userResponse;
        const { client_fk: client_id } = user; 

        return this.clientService.findOneByUnique({
            clientWhereUniqueInput: {client_id}
        })
    }
}
