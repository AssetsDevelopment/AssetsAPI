import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

    /**
     * Crea una empresa
     */
    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.create(createCompanyDto);
    }

    /**
     * Listar todas las empresas
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.companyService.findAll(paginationDto);
    }

    /**
     * Buscar una empresa por id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.companyService.findOne(id);
    }

    /**
     * Actualizar una empresa por id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateCompanyDto: UpdateCompanyDto
    ) {
        return this.companyService.update(id, updateCompanyDto);
    }
}
