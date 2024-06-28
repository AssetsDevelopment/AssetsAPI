import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { META_USER_TYPES } from '../decorators';
import { UserAuth } from '../entities/user-auth.entity';
import { user_types } from '../enums/user_types.enum';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
    constructor(
        private readonly reflector: Reflector 
    ) {}
  
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const ctx = GqlExecutionContext.create(context);
        
        const user_types_mt: user_types[] = this.reflector.get(META_USER_TYPES, ctx.getHandler());
        
        if (!user_types_mt || user_types_mt.length === 0) return true;
        
        const user: UserAuth = ctx.getContext().req.user;
        // const client = ctx.getContext().req.client;
        
        if (!user) throw new BadRequestException('User not found');
        // if ((user.user_type === user_types.client) && !client) throw new BadRequestException('Client type not found');

        if (user_types_mt.includes(user.user_type)) return true;

        // if (user_types_mt.includes(user_types.clientAdmin) && user.is)

        throw new ForbiddenException(
            `User ${user.name} ${user.last_name} need a user type: ${user_types_mt}`
        );
    }
}
