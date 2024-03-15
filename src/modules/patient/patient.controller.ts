import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

    /**
     * Crea un paciente
     */
    @Post()
    create(@Body() createPatientDto: CreatePatientDto) {
        return this.patientService.create(createPatientDto);
    }

    /**
     * Listar todos los pacientes
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.patientService.findAll(paginationDto);
    }

    /**
     * Buscar un paciente por id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.patientService.findOne(id);
    }

    /**
     * Actualizar un paciente por id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updatePatientDto: UpdatePatientDto
    ) {
        return this.patientService.update(id, updatePatientDto);
    }
}
