import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { ClientService } from '../client/client.service';
import { UserService } from '../user/user.service';
import { ProfessionalService } from '../professional/professional.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../user/entities/user.entity';
import { LoguinInput } from './dto';
import { AuthResponse } from './types/auth-response.type';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly clientService: ClientService,
        private readonly userService: UserService,
        private readonly professionalService: ProfessionalService,
    ) {}

    // CORREGIDO
    private getJwtToken(
        id: User['user_id']
    ): string {return this.jwtService.sign({id});}

    // CORREGIDO
    async loginUser(
        loguinInput: LoguinInput
    ): Promise<AuthResponse> {

        const {email, phone, password} = loguinInput;

        const [{user_login}]: [{user_login: number}] = await this.prisma.$queryRaw`
            SELECT user_login(${email}, ${phone}, ${password})
        `;

        if (!user_login) throw new UnauthorizedException('Credentials are not valid')
            
        // Verifico que el user este activo
        const user_id = user_login;
        const user = await this.userService.findOneByUnique({
            userWhereUniqueInput: {user_id}
        })

        if (!user.is_active) throw new UnauthorizedException('User is not active')
            
        // TODO: desinstalar bcrypt porque de eso se encarga la base de datos

        // Genero el token
        const token = this.getJwtToken(user_id);

        return {
            token, 
            user
        };
    }

    // CORREGIDO
    async validateUser(
        user_id: Prisma.userWhereUniqueInput['user_id'],
    ): Promise<User> {

        // Verifico que el usuario este activo
        const user = await this.userService.findOneByUnique({
            userWhereUniqueInput: {user_id}
        });

        if (!user.is_active) throw new UnauthorizedException('User is not active');

        return user;
    }

    // CORREGIDO
    revalidateToken(
        user: User
    ): AuthResponse {

        const {user_id} = user;
        const token = this.getJwtToken(user_id);

        return {
            token,
            user
        }
    }

}
