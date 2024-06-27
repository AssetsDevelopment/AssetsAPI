import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { ClientLoguinInput, ProfessionalLoguinInput } from './dto/inputs';

import { user_types } from './enums/user_types.enum';
import { Auth, CurrentUser } from './decorators';

import { AuthResponse } from './types/auth-response.type';
import { UserAuth } from './entities/user-auth.entity';
import { Client } from '../client/entities/client.entity';
import { Professional } from '../professional/entities/professional.entity';

import { AuthService } from './auth.service';
import { ClientService } from '../client/client.service';
import { ProfessionalService } from '../professional/professional.service';

@Resolver(() => AuthResponse)
export class AuthResolver {

    constructor(
        private readonly authService: AuthService,
        private readonly clientService: ClientService,
        private readonly professionalService: ProfessionalService,
    ) {}

    @Mutation(() => AuthResponse, { name: 'loginClient' })
    async loginClient(
        @Args('loginInput') loginInput: ClientLoguinInput
    ): Promise<AuthResponse> {
        return this.authService.loginClient(loginInput);
    }

    @Mutation(() => AuthResponse, { name: 'loginProfessional' })
    async loginProfessional(
        @Args('loginInput') loginInput: ProfessionalLoguinInput
    ): Promise<AuthResponse> {
        return this.authService.loginProfessional(loginInput);
    }

    @Auth(user_types.client, user_types.professional)
    @Query(() => AuthResponse, { name: 'revalidateUserAuth' })
    revalidateToken(
        @CurrentUser() userAuth: UserAuth
    ): AuthResponse {
        return this.authService.revalidateToken(userAuth);
    }
    
    @ResolveField(() => Client, {name: 'Client', nullable: true})
    async findClient(
        @Parent() authResponse: AuthResponse
    ): Promise<Client | null> {
        
        const { userAuth } = authResponse;
        const { id: user_id, user_type } = userAuth; 

        if (user_type !== user_types.client) return null;
    
        return this.clientService.findClintByUserId({user_id})
    }

    @ResolveField(() => Professional, {name: 'Professional', nullable: true})
    async findProfessional(
        @Parent() authResponse: AuthResponse
    ): Promise<Professional | null> {
        
        const { userAuth } = authResponse;
        const { id: professional_id, user_type } = userAuth; 

        if (user_type !== user_types.professional) return null;
    
        return this.professionalService.findOneByUnique({professional_id})
    }
}
