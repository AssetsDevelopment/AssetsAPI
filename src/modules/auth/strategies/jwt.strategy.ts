import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { user as User } from '@prisma/client';
import { JwtPayload } from 'src/modules/auth/interfaces';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger('JwtStrategy')

    constructor(
        private readonly prisma: PrismaService,
        configService: ConfigService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });

    }

    async validate(payload: JwtPayload): Promise<User> {

        const {user_id} = payload;

        const user = await this.prisma.user.findUnique({
            where: {
                user_id: user_id
            }
        })
        
        const user_professional = await this.prisma.professional.findUnique({
            where: {
                professional_id: user_id
            }
        })

        if (!user.is_active && !user_professional) {
            this.logger.error('User is not active')
            throw new UnauthorizedException('User is not active')
        }

        return user;
    }
}