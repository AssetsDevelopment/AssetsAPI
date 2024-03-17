import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderModule } from '../order/order.module';

@Module({
    imports: [PrismaModule, OrderModule],
    controllers: [ClaimController],
    providers: [ClaimService],
    exports: [ClaimService]
})
export class ClaimModule {}
