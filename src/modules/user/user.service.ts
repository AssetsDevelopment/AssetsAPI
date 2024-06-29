import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {

    private readonly logger = new Logger('UsersService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(params: {
        data: Prisma.userCreateInput
    }):Promise<User> {

        const { data } = params

        try {
            
            return await this.prisma.user.create({
                data
            }) as User // le pongo el as para que no me de error ya que choca con el "user_type"

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async findOneByUnique(params: {
        userWhereUniqueInput: Prisma.userWhereUniqueInput,
        select?: Prisma.userSelect
    }): Promise<User> {

        const { userWhereUniqueInput, select } = params

        try {
            
            return await this.prisma.user.findUniqueOrThrow({
                where: userWhereUniqueInput,
                select
            }) as User // le pongo el as para que no me de error ya que choca con el "user_type"

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }

    async findFirst(params: {
        where: Prisma.userWhereInput,
        select?: Prisma.userSelect
    }): Promise<User> {

        const { where, select } = params

        try {
            
            return await this.prisma.user.findFirstOrThrow({
                where,
                select
            }) as User // le pongo el as para que no me de error ya que choca con el "user_type"

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }

    async findAll(params: {
        where: Prisma.userWhereInput,
        select?: Prisma.userSelect,
        skip?: Prisma.userFindManyArgs['skip'],
        take?: Prisma.userFindManyArgs['take'],
    }): Promise<User[] | User> {

        const { where, select, skip, take } = params
        const { name } = where

        if (name) where.name = {
            contains: name as string,
            mode: 'insensitive'
        }
        
        try {

            return await this.prisma.user.findMany({
                where,
                select,
                skip,
                take
            }) as User[] // le pongo el as para que no me de error ya que choca con el "user_type"

        } catch (error) {
            // TODO: manage error
            throw new BadRequestException(error)
        }
    }

    async update(params: {
        where: Prisma.userWhereUniqueInput, 
        data: Prisma.userUpdateInput,
    }): Promise<User> {

        const {where, data} = params

        try {

            return await this.prisma.user.update({
                where,
                data
            }) as User // le pongo el as para que no me de error ya que choca con el "user_type"

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async changeAcitveUser(params: {
        where: Prisma.userWhereUniqueInput
    }): Promise<User> {

        const {where} = params
        const {user_id} = where

        try {

            const user = await this.findOneByUnique({
                userWhereUniqueInput: {user_id},
                select: {is_admin: true, is_active: true}
            })

            if (user.is_admin)
                throw new UnauthorizedException('You cannot change the status of an administrator')

            const is_active = !user.is_active
            return await this.prisma.user.update({
                where,
                data: {is_active}
            }) as User // le pongo el as para que no me de error ya que choca con el "user_type"

        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
