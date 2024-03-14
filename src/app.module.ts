import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { 
    ProfessionalModule,
    ClientModule,
    AuthModule,
    UserModule,
    ScreenModule
} from './modules';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ProfessionalModule,
        ClientModule,
        AuthModule,
        UserModule,
        ScreenModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
