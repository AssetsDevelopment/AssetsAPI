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

    @Auth(user_types.clientAdmin)
    @Mutation(() => User, { name: 'createUser' })
    async createUser(
        @CurrentUser('client_fk') client_id: User['client_fk'],
        @Args('createUserInput') createUserInput: CreateUserInput
    ): Promise<User> {
        
        return this.userService.create({
            data: {
                ...createUserInput,
                client: {
                    connect: {
                        client_id
                    }
                }
            }
        });
    }

    @Auth(user_types.clientAdmin)
    @Query(() => [User], { name: 'findUsers' })
    async findUsers(
        @CurrentUser('client_fk') client_fk: User['client_fk'],
        @Args() paginationArgs: PaginationArgs,
        @Args() searchArgs: SearchArgs
    ) {
        const { search: name } = searchArgs;

        return this.userService.findAll({
            where: {client_fk, name, 
                is_admin: false 
            },
            skip: paginationArgs.offset,
            take: paginationArgs.limit,
        });
    }

    @Auth(user_types.clientAdmin)
    @Query(() => User, { name: 'findUser' })
    async findUser(
        @Args('user_id', { type: () => ID }, ParseIntPipe) user_id: User['user_id'],
        @CurrentUser('client_fk') client_fk: User['client_fk'],
    ): Promise<User> {
        return this.userService.findOneByUnique({
            userWhereUniqueInput: {
                user_id,
                client_fk
            }
        });
    }

    @Auth(user_types.client)
    @Query(() => User, { name: 'User' })
    async User(
        @CurrentUser() user: User,
    ): Promise<User> {

        const { user_id, client_fk } = user;

        return this.userService.findOneByUnique({
            userWhereUniqueInput: {
                user_id,
                client_fk
            }
        });
    }

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

    @Auth(user_types.clientAdmin)
    @Mutation(() => User, { name: 'changeAcitveUser' })
    async changeAcitveUser(
        @Args('user_id', { type: () => ID }, ParseIntPipe) user_id: User['user_id'],
        @CurrentUser() user: User
    ): Promise<User> {

        const { client_fk, is_active, is_admin } = user;

        return this.userService.changeAcitveUser({
            where: {user_id, client_fk}
        })
    }
}
