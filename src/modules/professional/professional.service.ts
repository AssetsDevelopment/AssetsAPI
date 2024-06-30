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

    async create(params: {
        data: Prisma.professionalCreateInput
    }):Promise<Professional> {

        const { data } = params

        try {
            
            return await this.prisma.professional.create({
                data
            }) as Professional // le pongo el as para que no me de error ya que choca con el "fiscal_status"

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async findFirst(params: {
        where: Prisma.professionalWhereInput,
        select?: Prisma.professionalSelect
    }): Promise<Professional> {

        const { where, select } = params

        try {
            
            return await this.prisma.professional.findFirstOrThrow({
                where,
                select
            }) as Professional // le pongo el as para que no me de error ya que choca con el "fiscal_status"

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }
    // CORREGIDO
    async findOneByUnique(params: {
        professionalWhereUniqueInput: Prisma.professionalWhereUniqueInput,
        select?: Prisma.professionalSelect
    }): Promise<Professional> {

        const { 
            professionalWhereUniqueInput, 
            select 
        } = params

        try {
            
            return await this.prisma.professional.findUniqueOrThrow({
                where: professionalWhereUniqueInput,
                select
            }) as Professional // le pongo el as para que no me de error ya que choca con el "fiscal_status"

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }

    // CORREGIDO
    async update(params: {
        where: Prisma.professionalWhereUniqueInput, 
        data: Prisma.professionalUpdateInput,
    }): Promise<Professional> {

        const {where, data} = params

        try {

            return await this.prisma.professional.update({
                where,
                data
            }) as Professional // le pongo el as para que no me de error ya que choca con el "fiscal_status"

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    remove(id: number) {
        return `This action removes a #${id} professional`;
    }
}
