import { ArgsType, Field } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@ArgsType()
export class SearchArgs {

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    search?: string;

    // Aca podriamos agregar mas campos para filtrar la busqueda, como por ejemplo: "excluede", "caseSensitive", "category", etc.

}