import { UnauthorizedException } from "@nestjs/common";
import { user_types } from "../enums/user_types.enum";

export function validateUserType(params: {userTypes: user_types[], requiredUserTypes: user_types[]}): boolean {
    
    const { userTypes, requiredUserTypes } = params;
    
    const valid = userTypes.some(type => requiredUserTypes.includes(type));

    if (!valid) throw new UnauthorizedException("You don't have permission to access this resource.")

    return valid;
}
