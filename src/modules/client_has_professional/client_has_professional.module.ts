import { Module } from '@nestjs/common';
import { ClientHasProfessionalService } from './client_has_professional.service';
import { ClientHasProfessionalController } from './client_has_professional.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ClientHasProfessionalController],
    providers: [ClientHasProfessionalService],
    exports: [ClientHasProfessionalService]
})
export class ClientHasProfessionalModule {}
