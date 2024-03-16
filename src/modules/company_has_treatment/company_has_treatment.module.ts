import { Module } from '@nestjs/common';
import { CompanyHasTreatmentService } from './company_has_treatment.service';
import { CompanyHasTreatmentController } from './company_has_treatment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientModule } from '../client/client.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [PrismaModule, ClientModule, UserModule],
    controllers: [CompanyHasTreatmentController],
    providers: [CompanyHasTreatmentService],
    exports: [CompanyHasTreatmentService]
})
export class CompanyHasTreatmentModule {}
