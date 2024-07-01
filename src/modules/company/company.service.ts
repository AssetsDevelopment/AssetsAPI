import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Prisma } from '@prisma/client';
import { Company } from './entities/company.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {

    private readonly logger = new Logger('UsersService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(params: {
        data: Prisma.companyCreateInput
    }):Promise<Company> {

        const { data } = params

        try {
            
            const company = await this.prisma.company.create({
                data
            }) 

            console.log(company)

            return company

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // CORREGIDO
    async findAll(params: {
        where: Prisma.companyWhereInput,
        select?: Prisma.companySelect,
        skip?: Prisma.companyFindManyArgs['skip'],
        take?: Prisma.companyFindManyArgs['take'],
    }): Promise<Company[] | Company> {

        const { where, select, skip, take } = params
        const { name } = where

        if (name) where.name = {
            contains: name as string,
            mode: 'insensitive'
        }
        
        try {

            return await this.prisma.company.findMany({
                where,
                select,
                skip,
                take
            })

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }

    // CORREGIDO
    async findOneByUnique(params: {
        companyWhereUniqueInput: Prisma.companyWhereUniqueInput,
        select?: Prisma.companySelect
    }): Promise<Company> {

        const { companyWhereUniqueInput, select } = params

        try {
            
            return await this.prisma.company.findUniqueOrThrow({
                where: companyWhereUniqueInput,
                select
            })

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }

    // CORREGIDO
    async update(params: {
        where: Prisma.companyWhereUniqueInput, 
        data: Prisma.companyUpdateInput,
    }): Promise<Company> {

        const {where, data} = params

        try {

            return await this.prisma.company.update({
                where,
                data
            })

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // CORREGIDO
    async changeAcitveCompany(params: {
        companyChange: Prisma. companyWhereUniqueInput['company_id'],
        userAdmin: Prisma.companyWhereUniqueInput['client_fk'],
        is_active: Prisma.companyUpdateInput['is_active']
    }): Promise<Company> {

        const {companyChange, userAdmin, is_active} = params

        try {

            const client_fk = userAdmin
            const company_id = companyChange
            return await this.prisma.company.update({
                where: {company_id, client_fk},
                data: {is_active}
            })

        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
