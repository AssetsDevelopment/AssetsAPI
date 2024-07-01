import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { CreateCompanyInput, UpdateCompanyInput } from './dto';
import { Auth, CurrentUser } from '../auth/decorators';
import { user_types } from '../auth/enums/user_types.enum';
import { Client } from '../client/entities/client.entity';
import { PaginationArgs, SearchArgs } from '../common/dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Company)
export class CompanyResolver {

    constructor(private readonly companyService: CompanyService) {}

    @Auth(user_types.client)
    @Mutation(() => Company, { name: 'createCompany' })
    async createCompany(
        @CurrentUser('user_id') client_id: Client['client_id'],
        @Args('createCompanyInput') createCompanyInput: CreateCompanyInput
    ): Promise<Company> {
        
        return this.companyService.create({
            data: {
                ...createCompanyInput,
                client: {
                    connect: {
                        client_id
                    }
                }
            }
        });
    }

    @Auth(user_types.client)
    @Query(() => [Company], { name: 'FindCompanies' })
    async FindAll(
        @CurrentUser('user_id') client_fk: Client['client_fk'],
        @Args() paginationArgs: PaginationArgs,
        @Args() searchArgs: SearchArgs
    ): Promise<Company[] | Company> {
        const { search: name } = searchArgs;

        return this.companyService.findAll({
            where: {
                name,
                client_fk,
                is_active: true
            },
            skip: paginationArgs.offset,
            take: paginationArgs.limit,
        });
    }

    @Auth(user_types.client)
    @Query(() => Company, { name: 'findCompany' })
    async findOne(
        @Args('company_id', { type: () => ID }, ParseIntPipe) company_id: Company['company_id'],
        @CurrentUser('user_id') client_fk: Client['client_fk'],
    ): Promise<Company> {

        return this.companyService.findOneByUnique({
            companyWhereUniqueInput: {
                company_id,
                client_fk
            }
        })
    }

    @Auth(user_types.client)
    @Mutation(() => Company, { name: 'updateCompany' })
    async update(
        @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
        @CurrentUser('user_id') client_fk: Client['client_fk']
    ): Promise<Company> {

        const { company_id, ...rest} = updateCompanyInput;

        return this.companyService.update({
            where: {
                company_id,
                client_fk
            },
            data: rest
        })
    }

    @Auth(user_types.clientAdmin)
    @Mutation(() => Company, { name: 'changeAcitveCompany' })
    async changeAcitveCompany(
        @Args('company_id', { type: () => ID }, ParseIntPipe) company_id: Company['company_id'],
        @Args('is_active', { type: () => Boolean }) is_active: Company['is_active'],
        @CurrentUser('user_id') client_fk: Client['client_fk']
    ): Promise<Company> {

        return this.companyService.changeAcitveCompany({
            companyChange: company_id,
            userAdmin: client_fk,
            is_active
        })
    }
}
