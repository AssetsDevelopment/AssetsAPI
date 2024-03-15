import { Module } from '@nestjs/common';
import { WorkInvitationService } from './work_invitation.service';
import { WorkInvitationController } from './work_invitation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientModule, ProfessionalModule } from '..';

@Module({
    imports: [PrismaModule, ClientModule, ProfessionalModule],
    controllers: [WorkInvitationController],
    providers: [WorkInvitationService],
    exports: [WorkInvitationService]
})
export class WorkInvitationModule {}
