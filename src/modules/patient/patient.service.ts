import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UserService } from '../user/user.service';
import { CompanyService } from '../company/company.service';
import { ClientService } from '../client/client.service';

@Injectable()
export class PatientService {
    private readonly logger = new Logger('PatientService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly clientService: ClientService,
        private readonly userService: UserService,
        private readonly companyService: CompanyService,
    ) {}

    async create(createPatientDto: CreatePatientDto) {
        try {
            const patient = await this.prisma.patient.create({data: createPatientDto}); 
            return patient;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto) {
        const {limit, offset} = paginationDto;

        try {
            const patients = await this.prisma.patient.findMany({
                take: limit,
                skip: offset,
            });
            return patients;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);            
        }
    }

    async findOne(id: number) {

        try {
            const patient = await this.prisma.patient.findUnique({
                where: {
                    patient_id: id
                }
            });
            
            if (!patient) 
                throw new NotFoundException(`The patient with ID ${id} does not exist`);

            return patient;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(id: number, updatePatientDto: UpdatePatientDto) {
        
        await this.findOne(id);

        if (updatePatientDto.client_fk)
            await this.clientService.findOne(updatePatientDto.client_fk);
        
        if (updatePatientDto.user_fk)
            await this.userService.findOne(updatePatientDto.user_fk);
        
        if (updatePatientDto.company_fk)
            await this.companyService.findOne(updatePatientDto.company_fk);

        try {
            const updatedPatient = await this.prisma.patient.update({
                where: {patient_id: id},
                data: updatePatientDto
            });
            return updatedPatient;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
