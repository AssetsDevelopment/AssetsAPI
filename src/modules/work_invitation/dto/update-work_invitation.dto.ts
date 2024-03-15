import { PartialType } from '@nestjs/swagger';
import { CreateWorkInvitationDto } from './create-work_invitation.dto';

export class UpdateWorkInvitationDto extends PartialType(CreateWorkInvitationDto) {}
