import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

    /**
     * Crea un permiso
     */
    @Post()
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionService.create(createPermissionDto);
    }

    /**
     * Listar todos los permisos por cliente
     */
    @Get('client/:id')
    findAllPerClient(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) client_id: number,
        @Query() paginationDto: PaginationDto
    ) {
        return this.permissionService.findAllPerClient(paginationDto, client_id);
    }
 
    /**
     * Listar todos los permisos por usuario
     */
    @Get('user/:id')
    findAllPerUser(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) user_id: number,
        @Query() paginationDto: PaginationDto
    ) {
        return this.permissionService.findAllPerUser(paginationDto, user_id);
    }

    /**
     * Obtiene un permiso por vista y usuario
     */
    @Get('screen/:screen_id/user/:user_id')
    findOne(
        @Param('screen_id', ParseIntPipe, ParamIdPipeTsPipe) screen_id: number,
        @Param('user_id', ParseIntPipe, ParamIdPipeTsPipe) user_id: number
    ) {
        return this.permissionService.findOne(screen_id, user_id);
    }

    /**
     * Actualiza un permiso por vista y usuario
     */
    @Patch('screen/:screen_id/user/:user_id')
    update(
        @Param('screen_id', ParseIntPipe, ParamIdPipeTsPipe) screen_id: number,
        @Param('user_id', ParseIntPipe, ParamIdPipeTsPipe) user_id: number,
        @Body() updatePermissionDto: UpdatePermissionDto
    ) {
        return this.permissionService.update(screen_id, user_id, updatePermissionDto);
    }
}
