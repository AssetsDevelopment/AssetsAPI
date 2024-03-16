import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CompanyHasTreatmentService } from './company_has_treatment.service';
import { CreateCompanyHasTreatmentDto, UpdateCompanyHasTreatmentDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('CompanyHasTreatment')
@Controller('company-has-treatment')
export class CompanyHasTreatmentController {
  constructor(private readonly companyHasTreatmentService: CompanyHasTreatmentService) {}

    /**
     * Crea una nueva relacion entre empresa y prestacion
     */
    @Post()
    create(@Body() createCompanyHasTreatmentDto: CreateCompanyHasTreatmentDto) {
        return this.companyHasTreatmentService.create(createCompanyHasTreatmentDto);
    }

    /**
     * Listar todas las relaciones de un cliente
     */
    @Get('client/:client_id')
    findAllByClient(
        @Param('client_id', ParseIntPipe, ParamIdPipeTsPipe) client_id: number,
        @Query() paginationDto: PaginationDto
    ) {
        return this.companyHasTreatmentService.findAllByClient(paginationDto, client_id);
    }

    /**
     * Obtiene las relaciones de una empresa y cliente
     */
    @Get('client/:client_id/company/:company_id')
    findAllByCompany(
        @Param('client_id', ParseIntPipe, ParamIdPipeTsPipe) client_id: number,
        @Param('company_id', ParseIntPipe, ParamIdPipeTsPipe) company_id: number
    ) {
        return this.companyHasTreatmentService.findAllByCompany(client_id, company_id);
    }

    /**
     * Obtiene un registro por empresa y prestacion
     */
    @Get('company/:company_id/treatment/:treatment_id')
    findOne(
        @Param('company_id', ParseIntPipe, ParamIdPipeTsPipe) company_id: number,
        @Param('treatment_id', ParseIntPipe, ParamIdPipeTsPipe) treatment_id: number
    ) {
        return this.companyHasTreatmentService.findOne(company_id, treatment_id);
    }

    /**
     * Actualiza el estado de un registro por empresa y prestacion
     */
    @Patch('company/:company_id/treatment/:treatment_id')
    update(
        @Param('company_id', ParseIntPipe, ParamIdPipeTsPipe) company_id: number,
        @Param('treatment_id', ParseIntPipe, ParamIdPipeTsPipe) treatment_id: number,
        @Body() updateCompanyHasTreatmentDto: UpdateCompanyHasTreatmentDto
    ) {
        return this.companyHasTreatmentService.update(company_id, treatment_id, updateCompanyHasTreatmentDto);
    }
}
