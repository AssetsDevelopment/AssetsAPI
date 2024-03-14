import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateScreenDto, UpdateScreenDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ScreenService {

    private readonly logger = new Logger('ScreenService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(createScreenDto: CreateScreenDto) {
        try {
            const screen = await this.prisma.screen.create({data: createScreenDto});
            return screen; 
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        } 
    }

    async findAll(paginationDto: PaginationDto) {
        const {limit = 10, offset = 0} = paginationDto;

        try {
            const screens = await this.prisma.screen.findMany({
                take: limit,
                skip: offset
            });
            return screens;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(id: number) {

        try {
            const screen = await this.prisma.screen.findUnique({
                where: {
                    screen_id: id
                }
            });
            
            if (!screen) 
                throw new NotFoundException(`The screen with ID ${id} does not exist`);

            return screen;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(id: number, updateScreenDto: UpdateScreenDto) {
        
        await this.findOne(id);

        try {
            const updatedScreen = await this.prisma.screen.update({
                where: {screen_id: id},
                data: updateScreenDto
            });
            return updatedScreen;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
