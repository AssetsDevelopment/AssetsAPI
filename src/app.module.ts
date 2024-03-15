import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { 
    ProfessionalModule,
    ClientModule,
    AuthModule,
    UserModule,
    ScreenModule,
    PermissionModule,
    WorkInvitationModule,
    ClientHasProfessionalModule
} from './modules';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ProfessionalModule,
        ClientModule,
        AuthModule,
        UserModule,
        ScreenModule,
        PermissionModule,
        WorkInvitationModule,
        ClientHasProfessionalModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
