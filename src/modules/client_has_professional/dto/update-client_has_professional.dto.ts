import { PartialType } from '@nestjs/swagger';
import { CreateClientHasProfessionalDto } from './create-client_has_professional.dto';

export class UpdateClientHasProfessionalDto extends PartialType(CreateClientHasProfessionalDto) {}
