import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuth } from './entities/user-auth.entity';
import { Prisma } from '@prisma/client';
import { ClientService } from '../client/client.service';
import { UserService } from '../user/user.service';
import { ProfessionalService } from '../professional/professional.service';
import { ClientLoguinInput, ProfessionalLoguinInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import * as bcrypt from 'bcrypt';
import { user_types } from './enums/user_types.enum';
import { PrismaService } from 'src/prisma/prisma.service';

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
    ): Promise<AuthResponse> {

        const {email, password} = loguinInput;

        const [{user_login}]: [{user_login: number}] = await this.prisma.$queryRaw`
            SELECT user_login(${email}, ${password})
        `;

        if (!user_login) throw new UnauthorizedException('Credentials are not valid')

        const user = await this.userService.findOneByUnique({
            user_id: user_login
        }, {...this.properties})

        const userAuth: UserAuth = {
            id: user_login,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            is_active: user.is_active,
            user_type: user.user_type,
            created_at: user.created_at,
            updated_at: user.updated_at,    
        }

        const token = this.getJwtToken(userAuth.id, userAuth.user_type);

        return {
            token, 
            userAuth
        };
    }

    async loginProfessional(
        loguinInput: ProfessionalLoguinInput
    ): Promise<AuthResponse> {

        const {email, phone, password} = loguinInput;

        const [{professional_login}]: [{professional_login: number}] = await this.prisma.$queryRaw`
            SELECT professional_login(${email}, ${phone}, ${password})
        `;

        if (!professional_login) throw new UnauthorizedException('Credentials are not valid')

        const professional = await this.professionalService.findOneByUnique({professional_id: professional_login}, {
            ...this.properties
        })

        const userAuth: UserAuth = {
            id: professional_login,
            name: professional.name,
            last_name: professional.last_name,
            email: professional.email,
            password: professional.password,
            is_active: professional.is_active,
            user_type: professional.user_type,
            created_at: professional.created_at,
            updated_at: professional.updated_at,    
        }

        // TODO: desinstalar bcrypt porque de eso se encarga la base de datos

        const token = this.getJwtToken(userAuth.id, userAuth.user_type);

        return {
            token, 
            userAuth
        };
    }

    async validateClient(
        user_id: number,
    ): Promise<UserAuth> {

        // Verifico que el usuario este activo
        const user = await this.userService.findOneByUnique({user_id}, {
            user_id: true,
            client_fk: true,
            ...this.properties
        })

        if (!user.is_active) throw new UnauthorizedException('User is not active') 
            
        // Verifico que el cliente este activo
        const client = await this.clientService.findOneByUnique({client_id: user.client_fk}, {is_active: true})

        if (!client.is_active) throw new UnauthorizedException('Client is not active') 

        // Construyo el UserAuth
        const userAuth: UserAuth  = {
            id: user_id,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            is_active: user.is_active,
            user_type: user.user_type,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }

        return userAuth
    }

    async validateProfessional(
        professional_id: number
    ): Promise<UserAuth> {

        const professional = await this.professionalService.findOneByUnique({professional_id}, {
            ...this.properties
        }) as unknown as UserAuth

        const userAuth: UserAuth = {
            id: professional_id,
            ...professional
        }

        return userAuth
    }
}
