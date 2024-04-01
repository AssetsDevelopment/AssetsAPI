import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, TokenUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { IncomingHttpHeaders } from 'http';
import { Auth, GetUser } from './decorators';
import { user as User } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Iniciar sesión DASHBOARD
     */
    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    /**
     * Iniciar sesión MOBILE
     */
    @Post('login-mobile')
    loginMobile(@Body() loginUserDto: LoginUserDto) {
        return this.authService.loginMobile(loginUserDto);
    }

    /**
     * Decodificar token
     */
    @Get('decode-token')
    decodeToken(@Headers() headers: IncomingHttpHeaders) {
        // TODO: reviar porque no se esta documenta la respuesta
        const token = headers.authorization.split(' ')[1];
        return this.authService.decode(token);
    }

    /**
     * Verificar estado de autenticación
     */
    @Auth()
    @Get('check-status')
    checkAuthStatus(@GetUser() user: User) {
        return this.authService.checkAuthStatus(user);
    }
}
