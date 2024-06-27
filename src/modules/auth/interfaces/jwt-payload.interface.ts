import { user_types } from "../enums/user_types.enum";

export interface JwtPayload {
    id: number;
    user_type: user_types;
    iat: number;
    exp: number;
}