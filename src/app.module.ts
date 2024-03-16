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
    PatientModule,
    TreatmentModule,
    CompanyHasTreatmentModule
} from './modules';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        ClientModule,
        ClientHasProfessionalModule,
        CompanyHasTreatmentModule,
        CompanyModule,
        PatientModule,
        PermissionModule,
        ProfessionalModule,
        ScreenModule,
        TreatmentModule,
        UserModule,
        WorkInvitationModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
