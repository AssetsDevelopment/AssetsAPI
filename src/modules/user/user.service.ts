import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ClientService } from '../client/client.service';

@Injectable()
export class UserService {

    private readonly logger = new Logger('UserService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly clientService: ClientService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            const user = await this.prisma.user.create({data: createUserDto}); 
            return user;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findAll(paginationDto: PaginationDto) {
        const {limit, offset} = paginationDto;

        try {
            const users = await this.prisma.user.findMany({
                take: limit,
                skip: offset,
            });
            return users;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);            
        }
    }

    async findOne(id: number) {

        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    user_id: id
                }
            });
            
            if (!user) 
                throw new NotFoundException(`The user with ID ${id} does not exist`);

            return user;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        
        await this.findOne(id);

        if (updateUserDto.client_fk)
            await this.clientService.findOne(updateUserDto.client_fk);

        try {
            const updatedUser = await this.prisma.user.update({
                where: {user_id: id},
                data: updateUserDto
            });
            return updatedUser;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

}
