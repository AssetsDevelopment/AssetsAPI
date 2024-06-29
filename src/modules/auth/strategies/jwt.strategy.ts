import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { AuthService } from "../auth.service";
import { user_types } from "../enums/user_types.enum";
import { Professional } from "src/modules/professional/entities/professional.entity";
import { User } from "src/modules/user/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(
        private readonly authService: AuthService,
        configService: ConfigService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(
        payload: JwtPayload
    ): Promise<User | Professional> {

        const { id , user_type } = payload;

        const userAuth = user_type === user_types.client
            ? await this.authService.validateUser(id)
        : user_type === user_types.professional
            ? await this.authService.validateProfessional(id as any)
        : undefined;

        return userAuth;
    }
 
}