import { Args, Query, Mutation, Resolver, ResolveField, Parent } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./types/auth-response.type";
import { LoguinInput } from "./dto";
import { CurrentUser } from "./decorators";
import { User } from "../user/entities/user.entity";
import { Client } from "../client/entities/client.entity";
import { ClientService } from "../client/client.service";
import { Professional } from "../professional/entities/professional.entity";
import { ProfessionalService } from "../professional/professional.service";

@Resolver(() => AuthResponse)
export class AuthResolver {

    constructor(
        private readonly authService: AuthService,
        private readonly clientService: ClientService,
        private readonly professionalService: ProfessionalService,
    ) {}

    @Mutation(() => AuthResponse, { name: 'Login' })
    async loginUser(
        @Args('loginInput') loginInput: LoguinInput
    ): Promise<AuthResponse> {
        return this.authService.loginUser(loginInput);
    }

    @Query(() => AuthResponse, { name: 'revalidateClientAuth' })
    revalidateClientToken(
        @CurrentUser() user: User
    ): AuthResponse {
        return this.authService.revalidateToken(user);
    }

    @ResolveField(() => Client, {name: 'Client', nullable: true})
    async findClient(
        @Parent() authResponse: AuthResponse
    ): Promise<Client | null> {
        
        const { user } = authResponse;
        const { user_id: client_id } = user; 

        return this.clientService.findOneByUnique({
            clientWhereUniqueInput: {client_id}
        })
    }

    @ResolveField(() => Professional, {name: 'Professional', nullable: true})
    async findProfessional(
        @Parent() authResponse: AuthResponse
    ): Promise<Professional | null> {
        
        const { user } = authResponse;
        const { user_id: professional_id } = user; 

        return this.professionalService.findOneByUnique({
            professionalWhereUniqueInput: {professional_id}
        })
    }

}