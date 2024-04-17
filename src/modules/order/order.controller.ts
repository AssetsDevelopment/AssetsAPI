import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    /**
     * Crea un pedido
     */
    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    /**
     * Listar todos los pedidos
     */
    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.orderService.findAll(paginationDto);
    }

    /**
     * Buscar un pedido por id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.orderService.findOne(id);
    }
    
    /**
     * Actualizar un pedido por id
     */
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number, 
        @Body() updateOrderDto: UpdateOrderDto
    ) {
        return this.orderService.update(id, updateOrderDto);
    }

    /**
     * Buscar un pedido por profesional
     */
    @Get('professional/:id')
    findByProfessional(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.orderService.findByProfessional(id);
    }
}
