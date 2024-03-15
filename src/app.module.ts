import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { 
    ProfessionalModule,
    ClientModule,
    AuthModule,
    UserModule,
    ScreenModule,
    PermissionModule
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
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
