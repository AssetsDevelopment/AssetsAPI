import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { 
    ProfessionalModule,
    ClientModule,
    AuthModule,
    UserModule
} from './modules';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ProfessionalModule,
        ClientModule,
        AuthModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})

export class AppModule {}
