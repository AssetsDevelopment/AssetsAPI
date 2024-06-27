import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateProfessionalInput } from './dto/create-professional.input';
import { UpdateProfessionalInput } from './dto/update-professional.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Professional } from './entities/professional.entity';

@Injectable()
export class ProfessionalService {

    private readonly logger = new Logger('ProfessionalService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createProfessionalInput: CreateProfessionalInput) {
        return 'This action adds a new professional';
    }

    findAll() {
        return `This action returns all professional`;
    }

    findOne(id: number) {
        return `This action returns a #${id} professional`;
    }

    async findFirst(
        where: Prisma.professionalWhereInput,
        select?: Prisma.professionalSelect
    ): Promise<Professional> {

        try {
            
            return await this.prisma.professional.findFirstOrThrow({
                where,
                select
            }) as Professional // le pongo el as para que no me de error ya que choca con el "gender_options"

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }

    async findOneByUnique(
        professionalWhereUniqueInput: Prisma.professionalWhereUniqueInput,
        select?: Prisma.professionalSelect
    ): Promise<Professional> {

        try {
            
            return await this.prisma.professional.findUniqueOrThrow({
                where: professionalWhereUniqueInput,
                select
            }) as Professional // le pongo el as para que no me de error ya que choca con el "gender_options"

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }

    update(id: number, updateProfessionalInput: UpdateProfessionalInput) {
        return `This action updates a #${id} professional`;
    }

    remove(id: number) {
        return `This action removes a #${id} professional`;
    }
}
