import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserAuth } from "src/modules/auth/entities/user-auth.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { AuthService } from "../auth.service";
import { user_types } from "../enums/user_types.enum";

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

    async validate(payload: JwtPayload): Promise<UserAuth> {
        const { id , user_type } = payload;

        const user = user_type === user_types.client
            ? await this.authService.validateClient(id as any)
        : user_type === user_types.professional
            ? await this.authService.validateProfessional(id as any)
        : undefined;

        // if (!user) throw new UnauthorizedException('Unauthorized access')

        return user
    }
 
}