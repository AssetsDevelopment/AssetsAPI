import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ClientHasProfessionalService } from './client_has_professional.service';
import { CreateClientHasProfessionalDto, UpdateClientHasProfessionalDto } from './dto';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ClientHasProfessional')
@Controller('client-has-professional')
export class ClientHasProfessionalController {
    constructor(private readonly clientHasProfessionalService: ClientHasProfessionalService) {}

    /**
     * Listar todas las relaciones de un cliente
     */
    @Get('client/:client_id')
    findAllByClient(
        @Param('client_id', ParseIntPipe, ParamIdPipeTsPipe) client_id: number,
        @Query() paginationDto: PaginationDto
    ) {
        return this.clientHasProfessionalService.findAllByClient(paginationDto, client_id);
    }

    /**
     * Listar todas las relaciones de un profesional
     */
    @Get('professional/:professional_id')
    findAllByProfessional(
        @Param('professional_id', ParseIntPipe, ParamIdPipeTsPipe) professional_id: number,
        @Query() paginationDto: PaginationDto
    ) {
        return this.clientHasProfessionalService.findAllByProfessional(paginationDto, professional_id);
    }

    /**
     * Obtiene un registro por cliente y profesional
     */
    @Get('client/:client_id/professional/:professional_id')
    findOne(
        @Param('client_id', ParseIntPipe, ParamIdPipeTsPipe) client_id: number,
        @Param('professional_id', ParseIntPipe, ParamIdPipeTsPipe) professional_id: number
    ) {
        return this.clientHasProfessionalService.findOne(client_id, professional_id);
    }

    /**
     * Actualiza el estado de un registro por cliente y profesional
     */
    @Patch('client/:client_id/professional/:professional_id')
    update(
        @Param('client_id', ParseIntPipe, ParamIdPipeTsPipe) client_id: number,
        @Param('professional_id', ParseIntPipe, ParamIdPipeTsPipe) professional_id: number,
        @Body() updateClientHasProfessionalDto: UpdateClientHasProfessionalDto
    ) {
        return this.clientHasProfessionalService.update(client_id, professional_id, updateClientHasProfessionalDto);
    }
}
