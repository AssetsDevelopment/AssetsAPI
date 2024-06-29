import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { ClientService } from '../client/client.service';
import { UserService } from '../user/user.service';
import { ProfessionalService } from '../professional/professional.service';
import { ClientLoguinInput, ProfessionalLoguinInput } from './dto/inputs';
import { user_types } from './enums/user_types.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { Professional } from '../professional/entities/professional.entity';
import { User } from '../user/entities/user.entity';

// TODO: Hacer un archivo barril
import { UserResponse } from './types/user-response.type';
import { ProfessionalResponse } from './types/professional-response.type';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService')
    private readonly properties = {
        name: true,
        last_name: true,
        email: true,
        password: true,
        is_active: true,
        user_type: true,
        created_at: true,
        updated_at: true,
    }

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly clientService: ClientService,
        private readonly userService: UserService,
        private readonly professionalService: ProfessionalService,
    ) {}

    private getJwtToken(
        id: number,
        user_type: user_types
    ): string { 
        return this.jwtService.sign({
            id,
            user_type
        });
    }

    async loginClient(
        loguinInput: ClientLoguinInput
    ): Promise<UserResponse> {

        const {email, password} = loguinInput;

        const [{user_login}]: [{user_login: number}] = await this.prisma.$queryRaw`
            SELECT user_login(${email}, ${password})
        `;

        if (!user_login) throw new UnauthorizedException('Credentials are not valid')

        // Verifico que el usuario este activo
        const user_id = user_login;
        const user = await this.userService.findOneByUnique({
            userWhereUniqueInput: {user_id}
        })

        if (!user.is_active) throw new UnauthorizedException('User is not active') 

        // Verifico que el cliente este activo
        const {client_fk: client_id} = user;
        const client = await this.clientService.findOneByUnique({
            clientWhereUniqueInput: {client_id},
            select: {is_active: true}
        })

        if (!client.is_active) throw new UnauthorizedException('Client is not active') 

        // Genero el token
        const {user_type} = user;
        const token = this.getJwtToken(user_id, user_type);

        return {
            token, 
            user
        };
    }

    async loginProfessional(
        loguinInput: ProfessionalLoguinInput
    ): Promise<ProfessionalResponse> {

        const {email, phone, password} = loguinInput;

        const [{professional_login}]: [{professional_login: number}] = await this.prisma.$queryRaw`
            SELECT professional_login(${email}, ${phone}, ${password})
        `;

        if (!professional_login) throw new UnauthorizedException('Credentials are not valid')
            
        // Verifico que el profesional este activo
        const professional_id = professional_login;
        const professional = await this.professionalService.findOneByUnique({
            professionalWhereUniqueInput: {professional_id},
        })

        if (!professional.is_active) throw new UnauthorizedException('Professional is not active')
            
        // TODO: desinstalar bcrypt porque de eso se encarga la base de datos

        // Genero el token
        const {user_type} = professional;
        const token = this.getJwtToken(
            professional_id, user_type
        );

        return {
            token, 
            professional
        };
    }

    async validateUser(
        user_id: Prisma.userWhereUniqueInput['user_id'],
    ): Promise<User> {

        // Solo verifico si el usuario esta activo, ya que el cliente se va a verificar en el "loguin"

        // Verifico que el usuario este activo
        const user = await this.userService.findOneByUnique({
            userWhereUniqueInput: {user_id}
        })

        if (!user.is_active) throw new UnauthorizedException('User is not active')

        return user
    }

    async validateProfessional(
        professional_id: Prisma.professionalWhereUniqueInput['professional_id'],
    ): Promise<Professional> {

        const professional = await this.professionalService.findOneByUnique({
            professionalWhereUniqueInput: {professional_id},
        })

        if (!professional.is_active) throw new UnauthorizedException('User is not active')

        return professional
    }

    revalidateClientToken(
        user: User
    ): UserResponse {

        const {user_id, user_type} = user;
        const token = this.getJwtToken(user_id, user_type);

        return {
            token,
            user
        }
    }

    revalidateProfessionalToken(
        professional: Professional
    ): ProfessionalResponse {

        const {professional_id, user_type} = professional;
        const token = this.getJwtToken(
            professional_id, user_type
        );

        return {
            token,
            professional
        }
    }
}
