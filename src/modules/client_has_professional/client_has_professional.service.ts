import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClientHasProfessionalDto, UpdateClientHasProfessionalDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ClientHasProfessionalService {

    private readonly logger = new Logger('ClientHasProfessionalService')

    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async findAllByClient(paginationDto: PaginationDto, client_id: number) {
        const {limit = 10, offset = 0} = paginationDto;

        try {
            const client_has_professional = await this.prisma.client_has_professional.findMany({
                where:{
                    client_fk: client_id
                },
                take: limit,
                skip: offset
            });
            return client_has_professional;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAllByProfessional(paginationDto: PaginationDto, professional_id: number) {
        const {limit = 10, offset = 0} = paginationDto;

        try {
            const client_has_professional = await this.prisma.client_has_professional.findMany({
                where:{
                    professional_fk: professional_id
                },
                take: limit,
                skip: offset
            });
            return client_has_professional;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(client_id: number, professional_id: number) {

        try {
            const client_has_professional = await this.prisma.client_has_professional.findUnique({
                where: {
                    client_fk_professional_fk: {
                        client_fk: client_id,
                        professional_fk: professional_id
                    
                    }
                }
            });
            
            if (!client_has_professional) 
                throw new NotFoundException(`The relation with Client ID ${client_id} and Professional ID ${professional_id} does not exist`);

            return client_has_professional;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(client_id: number, professional_id: number, updateClientHasProfessionalDto: UpdateClientHasProfessionalDto) {
        
        const { is_active } = updateClientHasProfessionalDto;

        await this.findOne(client_id, professional_id);

        try {
            const updatedClientHasProfessional = await this.prisma.client_has_professional.update({
                where: {
                    client_fk_professional_fk: {
                        client_fk: client_id,
                        professional_fk: professional_id
                    }
                },
                data: {
                    is_active: is_active
                }
            });
            return updatedClientHasProfessional;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
