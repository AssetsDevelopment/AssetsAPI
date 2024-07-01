import { Type } from 'class-transformer';
import { CreateCompanyInput } from './create-company.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {

    @Field(() => ID)
    @Type(() => Number)
    @IsInt()
    company_id: number
}
