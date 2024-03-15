import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientModule } from '../client/client.module';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';

@Module({
    imports: [PrismaModule, ClientModule, UserModule, CompanyModule],
    controllers: [PatientController],
    providers: [PatientService],
    exports: [PatientService],
})
export class PatientModule {}
