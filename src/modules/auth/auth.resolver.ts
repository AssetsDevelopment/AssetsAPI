import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/auth-response.type';
import { ClientLoguinInput, ProfessionalLoguinInput } from './dto/inputs';
import { user_types } from './enums/user_types.enum';
import { Auth, CurrentUser } from './decorators';
import { UserAuth } from './entities/user-auth.entity';

@Resolver(() => AuthResponse)
export class AuthResolver {

    constructor(private readonly authService: AuthService) {}

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
    @Query(() => String)
    async hello(
        @CurrentUser('id') user: UserAuth
    ) {
        return 'Hello World';
    }

}
