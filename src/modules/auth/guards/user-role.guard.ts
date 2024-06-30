import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { META_USER_TYPES } from '../decorators';
import { user_types } from '../enums/user_types.enum';
import { User } from 'src/modules/user/entities/user.entity';

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

        if (user_types_mt.includes(user.user_type)) return true;

        // TODO: Fijarse si es viable enviar el "is_admin" por la metadata
        // if (user_types_mt.includes(user_types.clientAdmin)){
        //     if (
        //         userAuth.user_type === user_types.client 
        //         && ('is_admin' in userAuth) 
        //         && userAuth.is_admin
        //     ) {return true;} else throw new ForbiddenException(`User ${userAuth.name} ${userAuth.last_name} neded a user type: ${user_types_mt}`);
        // }
             
        throw new ForbiddenException(
            `User ${user.profile} need a user type: ${user_types_mt}`
        );
    }
}
