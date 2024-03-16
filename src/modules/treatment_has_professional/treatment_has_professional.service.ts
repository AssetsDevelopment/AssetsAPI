import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTreatmentHasProfessionalDto, UpdateTreatmentHasProfessionalDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ClientService } from '../client/client.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TreatmentHasProfessionalService {

    private readonly logger = new Logger('TreatmentHasProfessionalService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly clientService: ClientService,
        private readonly userService: UserService,
    ) {}

    async create(createTreatmentHasProfessionalDto: CreateTreatmentHasProfessionalDto) {
        try {
            const treatment_has_professional = await this.prisma.treatment_has_professional.create({data: createTreatmentHasProfessionalDto}); 
            return treatment_has_professional;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAllByClient(paginationDto: PaginationDto, client_id: number) {
        const {limit = 10, offset = 0} = paginationDto;

        try {
            const treatment_has_professional = await this.prisma.treatment_has_professional.findMany({
                where:{
                    client_fk: client_id
                },
                take: limit,
                skip: offset
            });
            return treatment_has_professional;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAllByTreatment(client_id: number, treatment_id: number) {

        try {
            const treatment_has_professional = await this.prisma.treatment_has_professional.findMany({
                where: {
                    client_fk: client_id,
                    treatment_fk: treatment_id
                }
            });
            
            if (!treatment_has_professional) 
                throw new NotFoundException(`The relation with Client ID ${client_id} and Treatment ID ${treatment_id} does not exist`);

            return treatment_has_professional;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async findAllByProfessional(client_id: number, professional_id: number) {

        try {
            const treatment_has_professional = await this.prisma.treatment_has_professional.findMany({
                where: {
                    client_fk: client_id,
                    professional_fk: professional_id
                }
            });
            
            if (!treatment_has_professional) 
                throw new NotFoundException(`The relation with Client ID ${client_id} and Professional ID ${professional_id} does not exist`);

            return treatment_has_professional;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async findOne(company_id: number, treatment_id: number, professional_id: number) {

        try {
            const treatment_has_professional = await this.prisma.treatment_has_professional.findUnique({
                where: {
                    company_fk_treatment_fk_professional_fk: {
                        company_fk: company_id,
                        treatment_fk: treatment_id,
                        professional_fk: professional_id
                    }
                }
            });
            
            if (!treatment_has_professional) 
                throw new NotFoundException(`The relation with Company ID ${company_id}, Treatment ID ${treatment_id} and Professional ID ${professional_id} does not exist`);

            return treatment_has_professional;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(company_id: number, treatment_id: number, professional_id: number, updateTreatmentHasProfessionalDto: UpdateTreatmentHasProfessionalDto) {
        
        await this.findOne(company_id, treatment_id, professional_id);

        if (updateTreatmentHasProfessionalDto.client_fk)
            await this.clientService.findOne(updateTreatmentHasProfessionalDto.client_fk);

        if (updateTreatmentHasProfessionalDto.user_fk)
            await this.userService.findOne(updateTreatmentHasProfessionalDto.user_fk);

        try {
            const updatedTreatmentHasProfessional = await this.prisma.treatment_has_professional.update({
                where: {
                    company_fk_treatment_fk_professional_fk: {
                        company_fk: company_id,
                        treatment_fk: treatment_id,
                        professional_fk: professional_id
                    }
                },
                data: updateTreatmentHasProfessionalDto
            });
            return updatedTreatmentHasProfessional;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
