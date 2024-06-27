import { UseGuards, applyDecorators } from "@nestjs/common";
import { RoleProtected } from "src/modules/auth/decorators";
import { UserRoleGuard } from "src/modules/auth/guards/user-role.guard";
import { user_types } from "../../enums/user_types.enum";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";

export function Auth(...roles: user_types[]) {

    return applyDecorators(
 
        RoleProtected(...roles),
        UseGuards( JwtAuthGuard, UserRoleGuard)
    )
}