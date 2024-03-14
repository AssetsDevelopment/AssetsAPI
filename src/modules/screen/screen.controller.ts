import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { CreateScreenDto, UpdateScreenDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Screen')
@Controller('screen')
export class ScreenController {
    constructor(private readonly screenService: ScreenService) {}

    /**
     * Crea una pantalla
     */
    @Post()
    create(@Body() createScreenDto: CreateScreenDto) {
        return this.screenService.create(createScreenDto);
    }

    /**
     * Listar todas las pantallas
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.screenService.findAll(paginationDto);
    }

    /**
     * Buscar una pantalla por id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.screenService.findOne(id);
    }

    /**
     * Actualiza una pantalla por id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateScreenDto: UpdateScreenDto
    ) {
        return this.screenService.update(id, updateScreenDto);
    }
}
