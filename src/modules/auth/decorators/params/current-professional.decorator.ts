import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Professional } from "src/modules/professional/entities/professional.entity";

export const CurrentProfessional = createParamDecorator(

    (data: keyof Professional, context: ExecutionContext) => {

        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        const user: Professional = data ? req.user[data] : req.user; 

        return user; 
    }
)
  