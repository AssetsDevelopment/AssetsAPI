import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto, UpdateTreatmentDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';

@ApiTags('Treatment')
@Controller('treatment')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

    /**
     * Crea una prestacion
     */
    @Post()
    create(@Body() createTreatmentDto: CreateTreatmentDto) {
        return this.treatmentService.create(createTreatmentDto);
    }

    /**
     * Listar todos las prestaciones
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.treatmentService.findAll(paginationDto);
    }

    /**
     * Buscar un prestación por id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.treatmentService.findOne(id);
    }

    /**
     * Actualizar una prestación por id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateTreatmentDto: UpdateTreatmentDto
    ) {
        return this.treatmentService.update(id, updateTreatmentDto);
    }
}
