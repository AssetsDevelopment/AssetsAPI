import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ID } from '@nestjs/graphql';
import { ClienthasprofessionalService } from './clienthasprofessional.service';
import { Clienthasprofessional } from './entities/clienthasprofessional.entity';
import { CreateClienthasprofessionalInput } from './dto/create-clienthasprofessional.input';
import { UpdateClienthasprofessionalInput } from './dto/update-clienthasprofessional.input';
import { Auth, CurrentUser } from '../auth/decorators';
import { User } from '../user/entities/user.entity';
import { Client } from '../client/entities/client.entity';
import { user_types } from '../auth/enums/user_types.enum';
import { PaginationArgs, SearchArgs } from '../common/dto';
import { Professional } from '../professional/entities/professional.entity';
import { ProfessionalService } from '../professional/professional.service';
import { ParseIntPipe } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Resolver(() => Clienthasprofessional)
export class ClienthasprofessionalResolver {
    constructor(
        private readonly clienthasprofessionalService: ClienthasprofessionalService,
        private readonly professionalService: ProfessionalService,
        private readonly userService: UserService
    ) {}

    @Auth(user_types.client)
    @Query(() => Clienthasprofessional, { name: 'findProfessional' })
    async findProfessional(
        @Args('professional_id', { type: () => ID }, ParseIntPipe) professional_fk: Clienthasprofessional['professional_fk'],
        @CurrentUser('user_id') client_fk: Clienthasprofessional['client_fk']
    ): Promise<Clienthasprofessional> {

        return await this.clienthasprofessionalService.findOneByUnique({
            where: {
                client_fk_professional_fk: {
                    client_fk,
                    professional_fk
                }
            }
        })
    }

    @Auth(user_types.client)
    @Query(() => [Clienthasprofessional], { name: 'findProfessionals' })
    async findProfessionals(
        @CurrentUser('user_id') client_id: Client['client_id'],
        @Args() paginationArgs: PaginationArgs,
        @Args() searchArgs: SearchArgs
    ): Promise<Clienthasprofessional[] | Clienthasprofessional> {

        const { search: profile } = searchArgs;

        return await this.clienthasprofessionalService.findAll({
            whereUser: {profile},
            where: {client_fk: client_id},
            skip: paginationArgs.offset,
            take: paginationArgs.limit,
        });
    }

    @ResolveField(() => User, {name: 'User'})
    async User(
        @Parent() clienthasprofessional: Clienthasprofessional
    ): Promise<User> {
        
        const { professional_fk: user_id } = clienthasprofessional; 

        return this.userService.findOneByUnique({
            userWhereUniqueInput: {user_id} 
        })
    }

    @ResolveField(() => Professional, {name: 'Professional'})
    async Professional(
        @Parent() clienthasprofessional: Clienthasprofessional
    ): Promise<Professional> {
        
        const { professional_fk: professional_id } = clienthasprofessional; 

        return this.professionalService.findOneByUnique({
            professionalWhereUniqueInput: {professional_id}
        })
    }
}
