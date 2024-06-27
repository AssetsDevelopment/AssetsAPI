import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateClientInput, UpdateClientInput } from './dto';
import { Prisma } from '@prisma/client';
import { Client } from './entities/client.entity';
import { PrismaService } from 'src/prisma/prisma.service';
// import { UserAuth } from '../auth/entities/user-auth.entity';

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

    async findClintByUserId(
        userWhereUniqueInput: Prisma.userWhereUniqueInput,
        select?: Prisma.clientSelect
    ): Promise<Client> {

        try {

            const user = await this.prisma.user.findUniqueOrThrow({
                where: userWhereUniqueInput,
                select: {client_fk: true}
            })

            const {client_fk: client_id} = user

            return await this.findOneByUnique({client_id},select)

        } catch (error) {
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
