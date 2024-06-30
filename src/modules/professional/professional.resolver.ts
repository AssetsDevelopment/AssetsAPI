import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfessionalService } from './professional.service';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalInput, UpdateProfessionalInput } from './dto';
import { user_types } from '../auth/enums/user_types.enum';
import { Auth, CurrentUser } from '../auth/decorators';
import { User } from '../user/entities/user.entity';
import { PaginationArgs, SearchArgs } from '../common/dto';

@Resolver(() => Professional)
export class ProfessionalResolver {

    constructor(private readonly professionalService: ProfessionalService) {}

//   @Query(() => [Professional], { name: 'professional' })
//   findAll() {
//     return this.professionalService.findAll();
//   }

    @Auth(user_types.professional)
    @Query(() => Professional, { name: 'Professional' })
    async Professional(
        @CurrentUser('user_id') professional_id: User['user_id'],
    ): Promise<Professional> {
        return this.professionalService.findOneByUnique({
            professionalWhereUniqueInput: {
                professional_id
            }
        });
    }

    @Auth(user_types.professional)
    @Mutation(() => Professional, { name: 'updateProfessional' })
    async updateUser(
        @Args('updateProfessionalInput') updateProfessionalInput: UpdateProfessionalInput,
        @CurrentUser('user_id') professional_id: Professional['professional_id']
    ): Promise<Professional> {

        return this.professionalService.update({
            where: { professional_id },
            data: updateProfessionalInput
        });
    }
}
