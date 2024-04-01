import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto, TokenUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';
import { user as User } from '@prisma/client';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async login(loginUserDto: LoginUserDto) {
        const {email, password} = loginUserDto;

        let user;

        try {

            const [{user_login}]: [{user_login:number}] = await this.prisma.$queryRaw
            `
                SELECT user_login(${email}, ${password})
            `;

            if (!user_login) throw new UnauthorizedException('Credentials are not valid')

            user = await this.prisma.user.findUnique({
                where: {user_id: user_login},
                select: {
                    user_id: true,
                    client_fk: true,
                    name: true,
                    is_admin: true
                }
            })
            
        } catch (error) {
            if (error.status === 401) return error.response;
            
            this.prisma.handleDBExeption(error, this.logger);
        }

        user.token = this.getJwtToken({user_id: user.user_id});

        return user;
    }

    async loginMobile(loginUserDto: LoginUserDto) {
        const {email, password} = loginUserDto;

        let user;

        try {

            const [{user_login}]: [{user_login:number}] = await this.prisma.$queryRaw
            `
                SELECT user_login_mobile(${email}, ${password})
            `;

            if (!user_login) throw new UnauthorizedException('Credentials are not valid')

            user = await this.prisma.professional.findUnique({
                where: {professional_id: user_login},
                select: {
                    professional_id: true,
                    name: true,
                    last_name: true,
                    gender: true,
                }
            })
            
        } catch (error) {
            if (error.status === 401) return error.response;
            
            this.prisma.handleDBExeption(error, this.logger);
        }

        user.token = this.getJwtToken({user_id: user.user_id});

        return user;
    }

    checkAuthStatus(user: User) {
        
        const responseUser = {
            user_id: true,
            client_fk: true,
            name: true,
            is_admin: true
        };

        return {
            ...responseUser,
            token: this.getJwtToken({user_id: user.user_id})
        }
    }

    private getJwtToken(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    decode(token: string): JwtPayload {
        return this.jwtService.decode(token) as JwtPayload;
    }
}
