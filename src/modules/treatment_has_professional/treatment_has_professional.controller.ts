import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TreatmentHasProfessionalService } from './treatment_has_professional.service';
import { CreateTreatmentHasProfessionalDto, UpdateTreatmentHasProfessionalDto } from './dto';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TreatmentHasProfessional')
@Controller('treatment-has-professional')
export class TreatmentHasProfessionalController {
  constructor(private readonly treatmentHasProfessionalService: TreatmentHasProfessionalService) {}

    /**
     * Crea una nueva relacion entre prestacion y profesional
     */
    @Post()
    create(@Body() createTreatmentHasProfessionalDto: CreateTreatmentHasProfessionalDto) {
        return this.treatmentHasProfessionalService.create(createTreatmentHasProfessionalDto);
    }

    /**
     * Listar todas las relaciones de un cliente
     */
    @Get('client/:client_id')
    findAllByClient(
        @Param('client_id', ParseIntPipe, ParamIdPipeTsPipe) client_id: number,
        @Query() paginationDto: PaginationDto
    ) {
        return this.treatmentHasProfessionalService.findAllByClient(paginationDto, client_id);
    }

    /**
     * Listar todos los profesionales de una prestacion
     */
    @Get('client/:client_id/treatment/:treatment_id')
    findAllByTreatment(
        @Param('client_id', ParseIntPipe, ParamIdPipeTsPipe) client_id: number,
        @Param('treatment_id', ParseIntPipe, ParamIdPipeTsPipe) treatment_id: number
    ) {
        return this.treatmentHasProfessionalService.findAllByTreatment(client_id, treatment_id);
    }

    /**
     * Listar todos los prestaciones de un profesional
     */
    @Get('client/:client_id/professional/:professional_id')
    findAllByProfessional(
        @Param('client_id', ParseIntPipe, ParamIdPipeTsPipe) client_id: number,
        @Param('professional_id', ParseIntPipe, ParamIdPipeTsPipe) professional_id: number
    ) {
        return this.treatmentHasProfessionalService.findAllByProfessional(client_id, professional_id);
    }

    /**
     * Obtiene un registro por empresa, prestacion y profesional
     */
    @Get('company/:company_id/treatment/:treatment_id/professional/:professional_id')
    findOne(
        @Param('company_id', ParseIntPipe, ParamIdPipeTsPipe) company_id: number,
        @Param('treatment_id', ParseIntPipe, ParamIdPipeTsPipe) treatment_id: number,
        @Param('professional_id', ParseIntPipe, ParamIdPipeTsPipe) professional_id: number
    ) {
        return this.treatmentHasProfessionalService.findOne(company_id, treatment_id, professional_id);
    }

    /**
     * Actualiza el estado de un registro por empresa, prestacion y profesional
     */
    @Patch('company/:company_id/treatment/:treatment_id/professional/:professional_id')
    update(
        @Param('company_id', ParseIntPipe, ParamIdPipeTsPipe) company_id: number,
        @Param('treatment_id', ParseIntPipe, ParamIdPipeTsPipe) treatment_id: number,
        @Param('professional_id', ParseIntPipe, ParamIdPipeTsPipe) professional_id: number,
        @Body() updateTreatmentHasProfessionalDto: UpdateTreatmentHasProfessionalDto
    ) {
        return this.treatmentHasProfessionalService.update(company_id, treatment_id, professional_id, updateTreatmentHasProfessionalDto);
    }
}
