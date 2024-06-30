import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';
import { UserByClientResolver } from './userByClient.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        PrismaModule,
        UserModule
    ],
    providers: [ClientResolver, UserByClientResolver, ClientService],
    exports: [ClientService]
})
export class ClientModule {}
