import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientModule } from '../client/client.module';

@Module({
    imports: [PrismaModule, ClientModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule {}
