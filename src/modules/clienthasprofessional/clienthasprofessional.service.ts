import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateClienthasprofessionalInput } from './dto/create-clienthasprofessional.input';
import { UpdateClienthasprofessionalInput } from './dto/update-clienthasprofessional.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfessionalService } from '../professional/professional.service';
import { ClientService } from '../client/client.service';
import { Prisma } from '@prisma/client';
import { User } from '../user/entities/user.entity';
import { Clienthasprofessional } from './entities/clienthasprofessional.entity';

@Injectable()
export class ClienthasprofessionalService {
 
    
    private readonly logger = new Logger('ClientHasProfessionalService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly professionalService: ProfessionalService,
        private readonly clientService: ClientService
    ) {}

    async findOneByUnique(params: {
        where: Prisma.client_has_professionalWhereUniqueInput,
        select?: Prisma.client_has_professionalSelect
    }): Promise<Clienthasprofessional> {

        const { where, select } = params

        try {

            return await this.prisma.client_has_professional.findUnique({
                where,
                select
            }) as unknown as Clienthasprofessional

        } catch (error) {
            
            throw new BadRequestException(error)
        }
    }

    async findAll(params: {
        whereUser?: Prisma.userWhereInput,
        where?: Prisma.client_has_professionalWhereInput,
        select?: Prisma.client_has_professionalSelect,
        skip?: Prisma.client_has_professionalFindManyArgs['skip'],
        take?: Prisma.client_has_professionalFindManyArgs['take'],
    }): Promise<Clienthasprofessional[] | Clienthasprofessional> {

        const { whereUser, where, select, skip, take } = params

        const { profile } = whereUser
        
        if (profile) where.professional = {
            user: {
                profile: {
                    contains: profile as string,
                    mode: 'insensitive'
                }
            }
        }

        try {

            return await this.prisma.client_has_professional.findMany({
                where,
                select,
                skip,
                take
            }) as unknown as Clienthasprofessional[]

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }
}
