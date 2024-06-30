import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Auth, CurrentUser } from '../auth/decorators';
import { user_types } from '../auth/enums/user_types.enum';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserByClientInput, UpdateUserByClientInput } from './dto';
import { PaginationArgs, SearchArgs } from '../common/dto';
import { ParseIntPipe } from '@nestjs/common';
import { Client } from './entities/client.entity';

@Resolver(() => User)
export class UserByClientResolver {

    constructor(
        private readonly userService: UserService
    ) {}

    @Auth(user_types.clientAdmin)
    @Mutation(() => User, { name: 'createUser' })
    async createUser(
        @CurrentUser('user_id') client_id: Client['client_id'],
        @Args('CreateUserByClientInput') CreateUserByClientInput: CreateUserByClientInput
    ): Promise<User> {
        
        return this.userService.createUserClient({
            client_id,
            data: CreateUserByClientInput
        });
    }

    @Auth(user_types.clientAdmin)
    @Query(() => [User], { name: 'findUsers' })
    async findUsers(
        @CurrentUser('user_id') client_fk: Client['client_fk'],
        @Args() paginationArgs: PaginationArgs,
        @Args() searchArgs: SearchArgs
    ): Promise<User[] | User> {
        const { search: profile } = searchArgs;

        return this.userService.findAll({
            where: {
                client: {
                    client_fk,
                    is_admin: false
                }, 
                profile, 
            },
            skip: paginationArgs.offset,
            take: paginationArgs.limit,
        });
    }

    @Auth(user_types.clientAdmin)
    @Query(() => User, { name: 'findUser' })
    async findUser(
        @Args('user_id', { type: () => ID }, ParseIntPipe) user_id: User['user_id'],
        @CurrentUser('user_id') client_fk: Client['client_fk'],
    ): Promise<User> {

        return this.userService.findOneByUnique({
            userWhereUniqueInput: {
                user_id,
                client: {
                    client_fk
                }
            }
        })
    }

    @Auth(user_types.client)
    @Mutation(() => User, { name: 'updateUserByClient' })
    async updateUser(
        @Args('UpdateUserByClientInput') UpdateUserByClientInput: UpdateUserByClientInput,
        @CurrentUser('user_id') client_fk: Client['client_fk']
    ): Promise<User> {

        const { user_id, ...rest} = UpdateUserByClientInput;

        return this.userService.update({
            where: {
                user_id,
                client: {
                    client_fk
                }
            },
            data: rest
        })
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => User, { name: 'changeAcitveUser' })
    async changeAcitveUser(
        @Args('user_id', { type: () => ID }, ParseIntPipe) user_id: User['user_id'],
        @Args('is_active', { type: () => Boolean }) is_active: User['is_active'],
        @CurrentUser('user_id') client_fk: Client['client_fk']
    ): Promise<User> {

        return this.userService.changeAcitveUser({
            userChange: user_id,
            userAdmin: client_fk,
            is_active
        })
    }
}
