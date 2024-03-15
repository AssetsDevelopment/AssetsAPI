import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ScreenService } from '../screen/screen.service';

@Injectable()
export class PermissionService {
    private readonly logger = new Logger('PermissionService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly screenService: ScreenService,
    ) {}

    async create(createPermissionDto: CreatePermissionDto) {
        try {
            const permission = await this.prisma.permission.create({data: createPermissionDto});
            return permission; 
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        } 
    }

    async findAllByClient(paginationDto: PaginationDto, client_id: number) {
        const {limit = 10, offset = 0} = paginationDto;

        try {
            const permissions = await this.prisma.permission.findMany({
                where:{
                    client_fk: client_id
                },
                take: limit,
                skip: offset
            });
            return permissions;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAllByUser(paginationDto: PaginationDto, user_id: number) {
        const {limit = 10, offset = 0} = paginationDto;

        try {
            const permissions = await this.prisma.permission.findMany({
                where:{
                    user_fk: user_id
                },
                take: limit,
                skip: offset
            });
            return permissions;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findOne(screen_id: number, user_id: number) {

        try {
            const permission = await this.prisma.permission.findUnique({
                where: {
                    user_fk_screen_fk: {
                        user_fk: user_id,
                        screen_fk: screen_id
                    }
                }
            });
            
            if (!permission) 
                throw new NotFoundException(`The permission with Screen ID ${screen_id} and User ID ${user_id} does not exist`);

            return permission;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(screen_id: number, user_id: number, updatePermissionDto: UpdatePermissionDto) {
        
        await this.findOne(screen_id, user_id);

        if (updatePermissionDto.screen_fk)
            await this.screenService.findOne(updatePermissionDto.screen_fk);

        try {
            const updatedPermission = await this.prisma.permission.update({
                where: {
                    user_fk_screen_fk: {
                        user_fk: user_id,
                        screen_fk: screen_id
                    }
                },
                data: updatePermissionDto
            });
            return updatedPermission;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
