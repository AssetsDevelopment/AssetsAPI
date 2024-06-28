import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { Prisma } from '@prisma/client';
import { UserAuth } from '../auth/entities/user-auth.entity';

@Injectable()
export class UserService {

    private readonly logger = new Logger('UsersService')

    constructor(
        private readonly prisma: PrismaService
    ) {}

    create(createUserInput: CreateUserInput) {
        return 'This action adds a new user';
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
        const { user_id } = where

        try {

            const user = await this.findOneByUnique({
                userWhereUniqueInput: {
                    user_id: user_id as UserAuth['id']
                },select: {
                    client_fk: true,
                    is_admin: true
                }
            })
        
            if (!user.is_admin) throw new UnauthorizedException('You are not authorized to perform this action')
            
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

    update(id: number, updateUserInput: UpdateUserInput) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
