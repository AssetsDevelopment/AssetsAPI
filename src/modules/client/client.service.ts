import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';

@Injectable()
export class ClientService {

    private readonly logger = new Logger('ClientService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(createClientDto: CreateClientDto) {
        try {
            const client = await this.prisma.client.create({data: createClientDto});
            return client; 
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto) {

        const {limit = 10, offset = 0} = paginationDto;

        try {
            const clients = await this.prisma.client.findMany({
                take: limit,
                skip: offset
            });
            return clients;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }

    }

    async findOne(id: number) {

        try {
            const client = await this.prisma.client.findUnique({
                where: {
                    client_id: id
                }
            });
            
            if (!client) 
                throw new NotFoundException(`The client with ID ${id} does not exist`);

            return client;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(id: number, updateClientDto: UpdateClientDto) {
        
        await this.findOne(id);

        try {
            const updatedClient = await this.prisma.client.update({
                where: {client_id: id},
                data: updateClientDto
            });
            return updatedClient;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
