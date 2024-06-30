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
            }) as Professional // le pongo el as para que no me de error ya que choca con el "gender_options"

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async findAll(params: {
        where: Prisma.professionalWhereInput,
        select?: Prisma.professionalSelect,
        skip?: Prisma.professionalFindManyArgs['skip'],
        take?: Prisma.professionalFindManyArgs['take'],
    }): Promise<Professional[] | Professional> {

        const { where, select, skip, take } = params
        const { name } = where

        if (name) where.name = {
            contains: name as string,
            mode: 'insensitive'
        }
        
        try {

            return await this.prisma.professional.findMany({
                where,
                select,
                skip,
                take
            }) as Professional[] // le pongo el as para que no me de error ya que choca con el "gender_options"

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }

    // async findAllByClient(params: {
    //     clientWhereUniqueInput: Prisma.clientWhereUniqueInput, 
    //     where: Prisma.professionalWhereInput,
    //     select?: Prisma.professionalSelect,
    //     skip?: Prisma.professionalFindManyArgs['skip'],
    //     take?: Prisma.professionalFindManyArgs['take'],
    // }): Promise<Professional[] | Professional> {

    //     const { 
    //         clientWhereUniqueInput,
    //         where,
    //         select,
    //         skip, 
    //         take 
    //     } = params
    //     const { name } = where

    //     if (name) where.name = {
    //         contains: name as string,
    //         mode: 'insensitive'
    //     }
        
    //     try {

    //         await this.prisma.client_has_professional.findMany({
    //             where: {
    //                 client_fk,
    //                 professional_fk
    //             }
    //         })



    //         return await this.prisma.professional.findMany({
    //             where: {
    //                 work_invitation: {
    //                     some: {
                            
    //                     }
    //                 }
    //             },
    //             select,
    //             skip,
    //             take
    //         }) as Professional[] // le pongo el as para que no me de error ya que choca con el "gender_options"

    //     } catch (error) {
    //         // TODO: manage error
    //         throw new BadRequestException(error)
    //     }
    // }

    findOne(id: number) {
        return `This action returns a #${id} professional`;
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
            }) as Professional // le pongo el as para que no me de error ya que choca con el "gender_options"

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
