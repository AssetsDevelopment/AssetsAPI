import { Args, Query, Mutation, Resolver, ResolveField, Parent } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./types/auth-response.type";
import { LoguinInput } from "./dto";
import { Auth, CurrentUser } from "./decorators";
import { User } from "../user/entities/user.entity";
import { Client } from "../client/entities/client.entity";
import { ClientService } from "../client/client.service";
import { Professional } from "../professional/entities/professional.entity";
import { ProfessionalService } from "../professional/professional.service";
import { user_types } from "./enums/user_types.enum";
import { validateUserType } from "./utils/check-userType.util";

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

    @Auth(user_types.client, user_types.professional)
    @Query(() => AuthResponse, { name: 'revalidateToken' })
    revalidateToken(
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

        validateUserType({
            userTypes: user.user_type,
            requiredUserTypes: [user_types.client] 
        })

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

        validateUserType({
            userTypes: user.user_type,
            requiredUserTypes: [user_types.professional] 
        })

        return this.professionalService.findOneByUnique({
            professionalWhereUniqueInput: {professional_id}
        })
    }
}