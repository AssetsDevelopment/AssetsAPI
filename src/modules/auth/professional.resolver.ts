import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ProfessionalLoguinInput } from './dto/inputs';

import { user_types } from './enums/user_types.enum';
import { Auth, CurrentProfessional } from './decorators';
import { ProfessionalResponse } from './types/professional-response.type';
import { Professional } from '../professional/entities/professional.entity';
import { AuthService } from './auth.service';

@Resolver(() => ProfessionalResponse)
export class ProfessionalAuthResolver {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Mutation(() => ProfessionalResponse, { name: 'loginProfessional' })
    async loginProfessional(
        @Args('loginInput') loginInput: ProfessionalLoguinInput
    ): Promise<ProfessionalResponse> {
        return this.authService.loginProfessional(loginInput);
    }

    @Auth(user_types.professional)
    @Query(() => ProfessionalResponse, { name: 'revalidateProfessionalAuth' })
    revalidateProfessionalToken(
        @CurrentProfessional() professional: Professional
    ): ProfessionalResponse {
        return this.authService.revalidateProfessionalToken(professional);
    }
}
