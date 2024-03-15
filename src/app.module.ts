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
    ClientHasProfessionalModule,
    CompanyModule,
} from './modules';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        ClientModule,
        ClientHasProfessionalModule,
        CompanyModule,
        PermissionModule,
        ProfessionalModule,
        ScreenModule,
        UserModule,
        WorkInvitationModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
