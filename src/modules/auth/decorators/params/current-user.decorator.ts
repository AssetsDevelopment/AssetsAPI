import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/modules/user/entities/user.entity";

export const CurrentUser = createParamDecorator(

    (data: keyof User, context: ExecutionContext) => {

        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        const user: User = data ? req.user[data] : req.user; 

        return user; 
    }
)
  