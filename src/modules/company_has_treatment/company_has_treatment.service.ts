import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCompanyHasTreatmentDto, UpdateCompanyHasTreatmentDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ClientService } from '../client/client.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CompanyHasTreatmentService {

    private readonly logger = new Logger('CompanyHasTreatmentService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly clientService: ClientService,
        private readonly userService: UserService,
    ) {}

    async create(createCompanyHasTreatmentDto: CreateCompanyHasTreatmentDto) {
        try {
            const company_has_treatment = await this.prisma.company_has_treatment.create({data: createCompanyHasTreatmentDto}); 
            return company_has_treatment;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAllByClient(paginationDto: PaginationDto, client_id: number) {
        const {limit = 10, offset = 0} = paginationDto;

        try {
            const company_has_treatment = await this.prisma.company_has_treatment.findMany({
                where:{
                    client_fk: client_id
                },
                take: limit,
                skip: offset
            });
            return company_has_treatment;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAllByCompany(client_id: number, company_id: number) {

        try {
            const company_has_treatment = await this.prisma.company_has_treatment.findMany({
                where: {
                    client_fk: client_id,
                    company_fk: company_id
                }
            });
            
            if (!company_has_treatment) 
                throw new NotFoundException(`The relation with Client ID ${client_id} and Company ID ${company_id} does not exist`);

            return company_has_treatment;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async findOne(company_id: number, treatment_id: number) {

        try {
            const company_has_treatment = await this.prisma.company_has_treatment.findUnique({
                where: {
                    company_fk_treatment_fk: {
                        company_fk: company_id,
                        treatment_fk: treatment_id
                    
                    }
                }
            });
            
            if (!company_has_treatment) 
                throw new NotFoundException(`The relation with Company ID ${company_id} and Treatment ID ${treatment_id} does not exist`);

            return company_has_treatment;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(company_id: number, treatment_id: number, updateCompanyHasTreatmentDto: UpdateCompanyHasTreatmentDto) {
        
        await this.findOne(company_id, treatment_id);

        if (updateCompanyHasTreatmentDto.client_fk)
            await this.clientService.findOne(updateCompanyHasTreatmentDto.client_fk);

        if (updateCompanyHasTreatmentDto.user_fk)
            await this.userService.findOne(updateCompanyHasTreatmentDto.user_fk);

        try {
            const updatedCompanyHasTreatment = await this.prisma.company_has_treatment.update({
                where: {
                    company_fk_treatment_fk: {
                        company_fk: company_id,
                        treatment_fk: treatment_id
                    }
                },
                data: updateCompanyHasTreatmentDto
            });
            return updatedCompanyHasTreatment;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
