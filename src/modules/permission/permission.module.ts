import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ScreenModule } from '..';

@Module({
    imports: [PrismaModule, ScreenModule],
    controllers: [PermissionController],
    providers: [PermissionService],
    exports: [PermissionService]
})
export class PermissionModule {}
