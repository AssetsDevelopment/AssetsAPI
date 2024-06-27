import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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

    create(createUserInput: CreateUserInput) {
        return 'This action adds a new user';
    }

    async findOneByUnique(
        userWhereUniqueInput: Prisma.userWhereUniqueInput,
        select?: Prisma.userSelect
    ): Promise<User> {

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

    async findFirst(
        where: Prisma.userWhereInput,
        select?: Prisma.userSelect
    ): Promise<User> {

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

    async findAll(
        where: Prisma.userWhereInput,
        select?: Prisma.userSelect
    ): Promise<User[] | User> {

        try {
            
            return await this.prisma.user.findMany({
                where,
                select
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
