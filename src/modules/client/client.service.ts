import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
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

    async findOneByUnique(
        clientWhereUniqueInput: Prisma.clientWhereUniqueInput,
        select?: Prisma.clientSelect
    ): Promise<Client> {

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

    update(id: number, updateClientInput: UpdateClientInput) {
        return `This action updates a #${id} client`;
    }

    remove(id: number) {
        return `This action removes a #${id} client`;
    }
}
