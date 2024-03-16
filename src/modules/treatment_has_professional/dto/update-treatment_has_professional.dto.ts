import { PartialType } from '@nestjs/swagger';
import { CreateTreatmentHasProfessionalDto } from './create-treatment_has_professional.dto';

export class UpdateTreatmentHasProfessionalDto extends PartialType(CreateTreatmentHasProfessionalDto) {}
