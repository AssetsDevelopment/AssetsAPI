import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto, UpdateProfessionalDto } from './dto';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParamIdPipeTsPipe } from 'src/modules/common/pipes/param-id.pipe.ts.pipe';

@ApiTags('Professional')
@Controller('professional')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) {}

    /**
     * Crea un profesional
     */
    @Post()
    create(@Body() createProfessionalDto: CreateProfessionalDto) {
        return this.professionalService.create(createProfessionalDto);
    }

    /**
     * Obtiene todos los profesionales
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.professionalService.findAll(paginationDto);
    }

    /**
     * Obtiene un profesional por su id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.professionalService.findOne(id);
    }

    /**
     * Actualiza un profesional por su id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateProfessionalDto: UpdateProfessionalDto
    ) {
        return this.professionalService.update(id, updateProfessionalDto);
    }
}
