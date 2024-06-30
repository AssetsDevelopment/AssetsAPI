import { Module } from '@nestjs/common';
import { ClientHasProfessionalService } from './client_has_professional.service';
import { ClientHasProfessionalResolver } from './client_has_professional.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientModule } from '../client/client.module';
import { ProfessionalModule } from '../professional/professional.module';

@Module({
    imports: [
        PrismaModule,
        ClientModule,
        ProfessionalModule
    ],
    providers: [ClientHasProfessionalResolver, ClientHasProfessionalService],
    exports: [ClientHasProfessionalService]
})
export class ClientHasProfessionalModule {}
