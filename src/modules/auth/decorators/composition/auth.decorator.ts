import { UseGuards, applyDecorators } from "@nestjs/common";
import { ValidRoles } from "src/modules/auth/interfaces/valid-roles";
import { RoleProtected } from "src/modules/auth/decorators";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "src/modules/auth/guards/user-role.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

export function Auth(...roles: ValidRoles[]) {

    return applyDecorators(
 
        ApiBearerAuth(),
        RoleProtected(...roles),
        UseGuards( AuthGuard(), UserRoleGuard)
    )

}