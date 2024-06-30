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

    // TODO: @Auth(user_types.clientAdmin)
    // @Query(() => [Professional], { name: 'findProfessional' })
    // async findProfessional(
    //     @CurrentUser('client_fk') client_fk: User['client_fk'],
    //     @Args() paginationArgs: PaginationArgs,
    //     @Args() searchArgs: SearchArgs
    // ): Promise<Professional[] | Professional> {
    //     const { search: name } = searchArgs;

    // }

//   @Mutation(() => Professional)
//   updateProfessional(@Args('updateProfessionalInput') updateProfessionalInput: UpdateProfessionalInput) {
//     return this.professionalService.update(updateProfessionalInput.id, updateProfessionalInput);
//   }

//   @Mutation(() => Professional)
//   removeProfessional(@Args('id', { type: () => Int }) id: number) {
//     return this.professionalService.remove(id);
//   }
}
