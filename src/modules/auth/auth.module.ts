import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthResolver } from './user.resolver';
import { ProfessionalAuthResolver } from './professional.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ClientModule } from '../client/client.module';
import { UserModule } from '../user/user.module';
import { ProfessionalModule } from '../professional/professional.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        ConfigModule,
        PrismaModule,
        ClientModule,
        UserModule,
        ProfessionalModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1d' }
                }
            } 
        })
    ],
    providers: [UserAuthResolver, ProfessionalAuthResolver, AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule, JwtModule]
    // TODO: no exporto el AuthService porque puede generar una dependencia circular
})

export class AuthModule {}
