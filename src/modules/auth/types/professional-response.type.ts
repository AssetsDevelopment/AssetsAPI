import { Field, ObjectType } from "@nestjs/graphql";
import { Professional } from "src/modules/professional/entities/professional.entity";

@ObjectType()
export class ProfessionalResponse {

    @Field( () => String )
    token: string;

    @Field( () => Professional )
    professional: Professional;
}