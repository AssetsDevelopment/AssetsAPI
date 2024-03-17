import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClaimDto, UpdateClaimDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class ClaimService {
    private readonly logger = new Logger('ClaimService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly orderService: OrderService,
    ) {}

    async create(createClaimDto: CreateClaimDto) {
        try {
            const claim = await this.prisma.claim.create({data: createClaimDto}); 
            return claim;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto) {
        const {limit, offset} = paginationDto;

        try {
            const claims = await this.prisma.claim.findMany({
                take: limit,
                skip: offset,
            });
            return claims;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);            
        }
    }

    async findOne(id: number) {

        try {
            const claim = await this.prisma.claim.findUnique({
                where: {
                    claim_id: id
                }
            });
            
            if (!claim) 
                throw new NotFoundException(`The claim with ID ${id} does not exist`);

            return claim;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(id: number, updateClaimDto: UpdateClaimDto) {
        
        await this.findOne(id);

        if (updateClaimDto.order_fk)
            await this.orderService.findOne(updateClaimDto.order_fk);

        try {
            const updatedClaim = await this.prisma.claim.update({
                where: {claim_id: id},
                data: updateClaimDto
            });
            return updatedClaim;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
