import { Field, ObjectType } from "@nestjs/graphql";
import { UserAuth } from "../entities/user-auth.entity";

@ObjectType()
export class AuthResponse {

    @Field( () => String )
    token: string;

    @Field( () => UserAuth )
    userAuth: UserAuth;
}