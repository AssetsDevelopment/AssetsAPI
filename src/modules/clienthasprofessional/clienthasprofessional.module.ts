import { Module } from '@nestjs/common';
import { ClienthasprofessionalService } from './clienthasprofessional.service';
import { ClienthasprofessionalResolver } from './clienthasprofessional.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientModule } from '../client/client.module';
import { ProfessionalModule } from '../professional/professional.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        PrismaModule,
        ClientModule,
        ProfessionalModule,
        UserModule
    ],
    providers: [ClienthasprofessionalResolver, ClienthasprofessionalService],
    exports: [ClienthasprofessionalService]
})
export class ClienthasprofessionalModule {}
