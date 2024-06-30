import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { META_USER_TYPES } from '../decorators';
import { user_types } from '../enums/user_types.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { validateUserType } from '../utils/check-userType.util';

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

        const user: User = ctx.getContext().req.user; 
        
        if (!user) throw new BadRequestException('User not found');

        return validateUserType({
            userTypes: user.user_type,
            requiredUserTypes: user_types_mt
        })
    }
}
