import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class OrderService {
    private readonly logger = new Logger('OrderService')

    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async create(createOrderDto: CreateOrderDto) {
        try {
            const order = await this.prisma.order.create({data: createOrderDto}); 
            return order;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto) {
        const {limit, offset} = paginationDto;

        try {
            const orders = await this.prisma.order.findMany({
                take: limit,
                skip: offset,
            });
            return orders;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);            
        }
    }

    async findOne(id: number) {

        try {
            const order = await this.prisma.order.findUnique({
                where: {
                    order_id: id
                }
            });
            
            if (!order) 
                throw new NotFoundException(`The order with ID ${id} does not exist`);

            return order;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }
    
    async findByProfessional(id: number, paginationDto: PaginationDto) {
        const {limit, offset} = paginationDto;

        try {
            const order = await this.prisma.order.findMany({
                where: {
                    professional_fk: id
                },
                take: limit,
                skip: offset,
                select:{
                    treatment: {
                        select: {
                            name: true
                        }
                    }, 
                    frequency: true,
                    total_sessions: true,
                    patient: {
                        select: {
                            name: true,
                            healthcare_provider: true,
                            company: {
                                select: {
                                    name: true
                                }
                            },
                        }
                    },
                }
            });
            
            if (!order) 
                throw new NotFoundException(`The order with professional ID ${id} does not exist`);

            return order;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        
        await this.findOne(id);

        try {
            const updatedOrder = await this.prisma.order.update({
                where: {order_id: id},
                data: updateOrderDto
            });
            return updatedOrder;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
