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
    CompanyHasTreatmentModule,
    TreatmentHasProfessionalModule,
    OrderModule
} from './modules';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        ClientModule,
        ClientHasProfessionalModule,
        CompanyHasTreatmentModule,
        CompanyModule,
        OrderModule,
        PatientModule,
        PermissionModule,
        ProfessionalModule,
        ScreenModule,
        TreatmentHasProfessionalModule,
        TreatmentModule,
        UserModule,
        WorkInvitationModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
