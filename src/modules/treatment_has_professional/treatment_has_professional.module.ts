import { Module } from '@nestjs/common';
import { TreatmentHasProfessionalService } from './treatment_has_professional.service';
import { TreatmentHasProfessionalController } from './treatment_has_professional.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientModule, UserModule } from '..';

@Module({
    imports: [PrismaModule, ClientModule, UserModule],
    controllers: [TreatmentHasProfessionalController],
    providers: [TreatmentHasProfessionalService],
    exports: [TreatmentHasProfessionalService]
})
export class TreatmentHasProfessionalModule {}
