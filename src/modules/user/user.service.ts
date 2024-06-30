import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { Prisma, user_types } from '@prisma/client';

@Injectable()
export class UserService {

    private readonly logger = new Logger('UsersService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    // async create(params: {
    //     data: Prisma.userCreateInput
    // }):Promise<User> {

    //     const { data } = params

    //     try {
            
    //         return await this.prisma.user.create({
    //             data
    //         }) as User // le pongo el as para que no me de error ya que choca con el "user_type"

    //     } catch (error) {
    //         throw new BadRequestException(error)
    //     }
    // }

    async createUserClient(params: {
        client_id: Prisma.clientWhereUniqueInput['client_id'],
        data: Prisma.userCreateInput
    }):Promise<User> {

        const { client_id, data } = params

        data.client = {
            create: {
                client_fk: client_id
            }
        }

        data.user_type = [user_types.client]

        try {
            
            return await this.prisma.user.create({
                data
            }) as User // le pongo el as para que no me de error ya que choca con el "user_type"

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // CORREGIDO
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

    // CORREGIDO
    async findAll(params: {
        where: Prisma.userWhereInput,
        select?: Prisma.userSelect,
        skip?: Prisma.userFindManyArgs['skip'],
        take?: Prisma.userFindManyArgs['take'],
    }): Promise<User[] | User> {

        const { where, select, skip, take } = params
        const { profile } = where

        if (profile) where.profile = {
            contains: profile as string,
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

        console.log('where', where)

        try {

            return await this.prisma.user.update({
                where,
                data
            }) as User // le pongo el as para que no me de error ya que choca con el "user_type"

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // CORREGIDO
    async changeAcitveUser(params: {
        userChange: Prisma. userWhereUniqueInput['user_id'],
        userAdmin: Prisma.clientWhereUniqueInput['client_fk'],
        is_active: Prisma.userUpdateInput['is_active']
    }): Promise<User> {

        const {userChange, userAdmin, is_active} = params

        try {

            // Verifico que el usuario no sea admin y que perteza al cliente
            const client_id = userChange
            const client_fk = userAdmin
            const client = await this.prisma.client.findFirstOrThrow({
                where: {client_id, client_fk},
                select: {is_admin: true}
            })
            
            if (client.is_admin)
                throw new UnauthorizedException('You cannot change the status of an administrator')

            const user_id = userChange
            return await this.prisma.user.update({
                where: {user_id},
                data: {is_active}
            }) as User // le pongo el as para que no me de error ya que choca con el "user_type"

        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
