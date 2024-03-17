import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { CreateClaimDto, UpdateClaimDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Claim')
@Controller('claim')
export class ClaimController {
    constructor(private readonly claimService: ClaimService) {}

    /**
     * Crea un reclamo
     */
    @Post()
    create(@Body() createClaimDto: CreateClaimDto) {
        return this.claimService.create(createClaimDto);
    }

    /**
     * Listar todos los reclamos
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.claimService.findAll(paginationDto);
    }

    /**
     * Buscar un reclamo por id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.claimService.findOne(id);
    }

    /**
     * Actualizar un reclamo por id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateClaimDto: UpdateClaimDto
    ) {
        return this.claimService.update(id, updateClaimDto);
    }
}
