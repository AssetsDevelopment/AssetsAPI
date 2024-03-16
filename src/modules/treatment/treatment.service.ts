import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTreatmentDto, UpdateTreatmentDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UserService } from '../user/user.service';
import { ClientService } from '../client/client.service';

@Injectable()
export class TreatmentService {
    private readonly logger = new Logger('TreatmentService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly clientService: ClientService,
        private readonly userService: UserService,
    ) {}

    async create(createTreatmentDto: CreateTreatmentDto) {
        try {
            const treatment = await this.prisma.treatment.create({data: createTreatmentDto}); 
            return treatment;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto) {
        const {limit, offset} = paginationDto;

        try {
            const treatments = await this.prisma.treatment.findMany({
                take: limit,
                skip: offset,
            });
            return treatments;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);            
        }
    }

    async findOne(id: number) {

        try {
            const treatment = await this.prisma.treatment.findUnique({
                where: {
                    treatment_id: id
                }
            });
            
            if (!treatment) 
                throw new NotFoundException(`The treatment with ID ${id} does not exist`);

            return treatment;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
        
        await this.findOne(id);

        if (updateTreatmentDto.client_fk)
            await this.clientService.findOne(updateTreatmentDto.client_fk);

        if (updateTreatmentDto.user_fk)
            await this.userService.findOne(updateTreatmentDto.user_fk);

        try {
            const updatedTreatment = await this.prisma.treatment.update({
                where: {treatment_id: id},
                data: updateTreatmentDto
            });
            return updatedTreatment;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
