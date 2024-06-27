import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [
        PrismaModule,
    ],
    providers: [ClientResolver, ClientService],
    exports: [ClientService]
})
export class ClientModule {}
