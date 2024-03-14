import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ScreenController],
    providers: [ScreenService],
    exports: [ScreenService]
})
export class ScreenModule {}
