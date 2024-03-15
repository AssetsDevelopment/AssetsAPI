import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WorkInvitationService } from './work_invitation.service';
import { CreateWorkInvitationDto, UpdateWorkInvitationDto } from './dto';
import { ParamIdPipeTsPipe } from '../common/pipes/param-id.pipe.ts.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WorkInvitation')
@Controller('work-invitation')
export class WorkInvitationController {
    constructor(private readonly workInvitationService: WorkInvitationService) {}

    /**
     * Crea una invitaciónn
     */
    @Post()
    create(@Body() createWorkInvitationDto: CreateWorkInvitationDto) {
        return this.workInvitationService.create(createWorkInvitationDto);
    }

    /**
     * Obtiene todas las invitaciones de un cliente
     */
    @Get('client/:id')
    findInvitationByClient(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.workInvitationService.findInvitationByClient(id);
    }

    /**
     * Obtiene todas las invitaciones de un profesional
     */
    @Get('professional/:id')
    findInvitationByProfessional(@Param('id', ParseIntPipe, ParamIdPipeTsPipe) id: number) {
        return this.workInvitationService.findInvitationByProfessional(id);
    }

    /**
     * Acepta una invitación
     */
    @Patch('client/:client_id/professional/:professional_id')
    acceptInvitation(
        @Param('client_id', ParseIntPipe, ParamIdPipeTsPipe) client_id: number,
        @Param('professional_id', ParseIntPipe, ParamIdPipeTsPipe) professional_id: number,
    ) {
        return this.workInvitationService.acceptInvitation(client_id, professional_id);
    }
}
