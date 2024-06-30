import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput, UpdateUserInput } from './dto';
import { PaginationArgs, SearchArgs } from '../common/dto';
import { user_types } from '../auth/enums/user_types.enum';
import { Auth, CurrentUser } from '../auth/decorators';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {

    constructor(private readonly userService: UserService) {}

    // TODO: @Auth(user_types.clientAdmin)
    @Mutation(() => User, { name: 'createUser' })
    async createUser(
        @CurrentUser('user_id') client_id: User['user_id'],
        @Args('createUserInput') createUserInput: CreateUserInput
    ): Promise<User> {
        
        return this.userService.create({
            data: {
                client: {
                    create: {
                        client_fk: client_id
                    }
                },
                ...createUserInput
            }
        });
    }

    // TODO: @Auth(user_types.clientAdmin)
    @Query(() => [User], { name: 'findUsers' })
    async findUsers(
        @CurrentUser('user_id') client_fk: User['user_id'],
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

    // TODO: @Auth(user_types.clientAdmin)
    @Query(() => User, { name: 'findUser' })
    async findUser(
        @Args('user_id', { type: () => ID }, ParseIntPipe) user_id: User['user_id'],
        @CurrentUser('user_id') client_fk: User['user_id'],
    ): Promise<User> {
        return this.userService.findOneByUnique({
            userWhereUniqueInput: {
                user_id,
                client: {client_fk}
            }
        });
    }

    @Auth(user_types.client)
    @Query(() => User, { name: 'User' })
    async User(
        @CurrentUser('user_id') user_id: User['user_id'],
    ): Promise<User> {

        return this.userService.findOneByUnique({
            userWhereUniqueInput: {user_id}
        });
    }

    // TODO: Corregir updateUserInput
    @Auth(user_types.client)
    @Mutation(() => User, { name: 'updateUser' })
    async updateUser(
        @Args('updateUserInput') updateClientInput: UpdateUserInput,
        @CurrentUser('user_id') user_id: User['user_id']
    ): Promise<User> {

        return this.userService.update({
            where: {user_id},
            data: updateClientInput
        })
    }

    // TODO: @Auth(user_types.clientAdmin)
    @Mutation(() => User, { name: 'changeAcitveUser' })
    async changeAcitveUser(
        @Args('user_id', { type: () => ID }, ParseIntPipe) user_id: User['user_id'],
        @CurrentUser() user: User
    ): Promise<User> {

        return this.userService.changeAcitveUser({
            where: {user_id}
        })
    }
}
