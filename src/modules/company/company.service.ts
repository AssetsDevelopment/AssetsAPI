import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ClientService } from '../client/client.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CompanyService {

    private readonly logger = new Logger('CompanyService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly clientService: ClientService,
        private readonly userService: UserService,
    ) {}

    async create(createCompanyDto: CreateCompanyDto) {
        try {
            const company = await this.prisma.company.create({data: createCompanyDto}); 
            return company;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto) {
        const {limit, offset} = paginationDto;

        try {
            const companies = await this.prisma.company.findMany({
                take: limit,
                skip: offset,
            });
            return companies;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);            
        }
    }

    async findOne(id: number) {

        try {
            const company = await this.prisma.company.findUnique({
                where: {
                    company_id: id
                }
            });
            
            if (!company) 
                throw new NotFoundException(`The company with ID ${id} does not exist`);

            return company;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(id: number, updateCompanyDto: UpdateCompanyDto) {
        
        await this.findOne(id);

        if (updateCompanyDto.client_fk)
            await this.clientService.findOne(updateCompanyDto.client_fk);
        
        if (updateCompanyDto.user_fk)
            await this.userService.findOne(updateCompanyDto.user_fk);

        try {
            const updatedCompany = await this.prisma.company.update({
                where: {company_id: id},
                data: updateCompanyDto
            });
            return updatedCompany;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
