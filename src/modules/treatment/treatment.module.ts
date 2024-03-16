import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientModule } from '../client/client.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [PrismaModule, ClientModule, UserModule],
    controllers: [TreatmentController],
    providers: [TreatmentService],
    exports: [TreatmentService]
})
export class TreatmentModule {}
