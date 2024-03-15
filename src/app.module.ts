import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { 
    ProfessionalModule,
    ClientModule,
    AuthModule,
    UserModule,
    ScreenModule,
    PermissionModule,
    WorkInvitationModule
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
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
