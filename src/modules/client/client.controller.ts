import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/modules/common/dto/pagination.dto';
import { ParamIdPipeTsPipe } from 'src/modules/common/pipes/param-id.pipe.ts.pipe';

@ApiTags('Client')
@Controller('client')
export class ClientController {

    constructor(private readonly clientService: ClientService) {}

    /**
     * Crear un cliente
     */
    @Post()
    create(@Body() createClientDto: CreateClientDto) {
        return this.clientService.create(createClientDto);
    }

    /**
     * Listar todos los clientes
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.clientService.findAll(paginationDto);
    }

    /**
     * Buscar un cliente por id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.clientService.findOne(id);
    }

    /**
     * Actualizar un cliente por id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateClientDto: UpdateClientDto,
    ) {
        return this.clientService.update(id, updateClientDto);
    }
}
