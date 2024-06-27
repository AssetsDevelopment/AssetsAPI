import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalResolver } from './professional.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [
        PrismaModule,
    ],
    providers: [ProfessionalResolver, ProfessionalService],
    exports: [ProfessionalService]
})
export class ProfessionalModule {}
