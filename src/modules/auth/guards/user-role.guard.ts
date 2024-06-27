import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { META_USER_TYPES } from '../decorators';
import { UserAuth } from '../entities/user-auth.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
    constructor(
        private readonly reflector: Reflector 
    ) {}
  
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const ctx = GqlExecutionContext.create(context);
        
        const user_types: string[] = this.reflector.get(META_USER_TYPES, ctx.getHandler());
        
        if (!user_types || user_types.length === 0) return true;
        
        const user: UserAuth = ctx.getContext().req.user;
        
        if (!user) throw new BadRequestException('User not found');
        
        if (user_types.includes(user.user_type)) return true;

        throw new ForbiddenException(
            `User ${user.name} ${user.last_name} need a user type: ${user_types}`
        );
    }
}
