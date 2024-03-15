import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateWorkInvitationDto, UpdateWorkInvitationDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientService } from '../client/client.service';
import { ProfessionalService } from '../professional/professional.service';

@Injectable()
export class WorkInvitationService {
    private readonly logger = new Logger('WorkInvitationService')

    constructor(
        private readonly prisma: PrismaService,
        private readonly clientService: ClientService,
        private readonly professionalService: ProfessionalService,
    ) {}

    async create(createWorkInvitationDto: CreateWorkInvitationDto) {

        delete createWorkInvitationDto.sender;
        
        try {
            const work_invitation = await this.prisma.work_invitation.create({data: createWorkInvitationDto}); 
            return work_invitation;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }

    async findInvitationByClient(id: number) {

        try {
            const work_invitation = await this.prisma.work_invitation.findMany({
                where: {
                    client_fk: id
                }
            });
            
            if (!work_invitation) 
                throw new NotFoundException(`Invitations not found for the provided client ID ${id}.`);

            return work_invitation;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async findInvitationByProfessional(id: number) {

        try {
            const work_invitation = await this.prisma.work_invitation.findMany({
                where: {
                    professional_fk: id
                }
            });
            
            if (!work_invitation) 
                throw new NotFoundException(`Invitations not found for the provided professional ID ${id}.`);

            return work_invitation;

        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);   
        }
    }

    async acceptInvitation(client_id: number, professional_id: number) {
        
        if (client_id)
            await this.clientService.findOne(client_id);

        if (client_id)
            await this.professionalService.findOne(professional_id);

        try {
            const updatedUser = await this.prisma.work_invitation.update({
                where: {
                    client_fk_professional_fk: {
                        client_fk: client_id,
                        professional_fk: professional_id
                    }
                },
                data: {is_accept: true}
            });
            return updatedUser;
        } catch (error) {
            this.prisma.handleDBExeption(error, this.logger);
        }
    }
}
