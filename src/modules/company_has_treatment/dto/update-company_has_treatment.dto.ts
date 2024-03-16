import { PartialType } from '@nestjs/swagger';
import { CreateCompanyHasTreatmentDto } from './create-company_has_treatment.dto';

export class UpdateCompanyHasTreatmentDto extends PartialType(CreateCompanyHasTreatmentDto) {}
