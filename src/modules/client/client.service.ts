import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateClientInput, UpdateClientInput } from './dto';
import { Prisma } from '@prisma/client';
import { Client } from './entities/client.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {

    private readonly logger = new Logger('ClientService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createClientInput: CreateClientInput) {
        return 'This action adds a new client';
    }

    findAll() {
        return `This action returns all client`;
    }

    findOne(id: number) {
        return `This action returns a #${id} client`;
    }

    // CORREGIDO
    async findOneByUnique(params: {
        clientWhereUniqueInput: Prisma.clientWhereUniqueInput,
        select?: Prisma.clientSelect
    }): Promise<Client> {

        const {clientWhereUniqueInput, select} = params

        try {
            
            return await this.prisma.client.findUniqueOrThrow({
                where: clientWhereUniqueInput,
                select
            })

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }
    
    // CORREGIDO
    async update(params: {
        where: Prisma.clientWhereUniqueInput, 
        data: Prisma.clientUpdateInput,
    }): Promise<Client> {

        const {where, data} = params

        try {

            return await this.prisma.client.update({
                where,
                data
            })

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    remove(id: number) {
        return `This action removes a #${id} client`;
    }
}
