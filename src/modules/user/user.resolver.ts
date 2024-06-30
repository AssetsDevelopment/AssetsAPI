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

    @Auth(user_types.professional, user_types.client)
    @Query(() => User, { name: 'User' })
    async User(
        @CurrentUser('user_id') user_id: User['user_id'],
    ): Promise<User> {

        return this.userService.findOneByUnique({
            userWhereUniqueInput: {
                user_id
            }
        })
    }

    @Auth(user_types.client)
    @Mutation(() => User, { name: 'updateUser' })
    async updateUser(
        @Args('updateUserInput') updateClientInput: UpdateUserInput,
        @CurrentUser('user_id') user_id: User['user_id']
    ): Promise<User> {

        return this.userService.update({
            where: {
                user_id,
            },
            data: updateClientInput
        })
    }
}
