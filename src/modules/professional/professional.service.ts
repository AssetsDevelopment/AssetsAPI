import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProfessionalDto, UpdateProfessionalDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';

@Injectable()
export class ProfessionalService {
    private readonly logger = new Logger('ProfessionalService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(createProfessionalDto: CreateProfessionalDto) {
        try {
            const professional = await this.prisma.professional.create({data: createProfessionalDto});
            return professional; 
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        } 
    }

    async findAll(paginationDto: PaginationDto) {
        const {limit = 10, offset = 0} = paginationDto;

        try {
            const professionals = await this.prisma.professional.findMany({
                take: limit,
                skip: offset
            });
            return professionals;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(id: number) {

        try {
            const professional = await this.prisma.professional.findUnique({
                where: {
                    professional_id: id
                }
            });
            
            if (!professional) 
                throw new NotFoundException(`The professional with ID ${id} does not exist`);

            return professional;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
        
        await this.findOne(id);

        try {
            const updatedProfessional = await this.prisma.professional.update({
                where: {professional_id: id},
                data: updateProfessionalDto
            });
            return updatedProfessional;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
