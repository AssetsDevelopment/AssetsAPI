import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserAuth } from "../../entities/user-auth.entity";

export const CurrentUser = createParamDecorator(

    (data: keyof UserAuth, context: ExecutionContext) => {

        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        const user: UserAuth = data ? req.user[data] : req.user; 

        return user; 
    }
)