import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginationArgs, SearchArgs } from '../common/dto';
import { user_types } from '../auth/enums/user_types.enum';
import { Auth, CurrentUser } from '../auth/decorators';
import { UserAuth } from '../auth/entities/user-auth.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

//   @Mutation(() => User)
//   createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
//     return this.userService.create(createUserInput);
//   }

    @Auth(user_types.client)
    @Query(() => [User], { name: 'findUsers' })
    async findUsers(
        @CurrentUser('id') user_id: UserAuth['id'],
        @Args() paginationArgs: PaginationArgs,
        @Args() searchArgs: SearchArgs
    ) {
        return this.userService.findAll({
            where: {user_id},
            skip: paginationArgs.limit,
            take: paginationArgs.offset,
        });
    }

//   @Query(() => User, { name: 'user' })
//   findOne(@Args('id', { type: () => Int }) id: number) {
//     return this.userService.findOne(id);
//   }

//   @Mutation(() => User)
//   updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
//     return this.userService.update(updateUserInput.id, updateUserInput);
//   }

//   @Mutation(() => User)
//   removeUser(@Args('id', { type: () => Int }) id: number) {
//     return this.userService.remove(id);
//   }
}
