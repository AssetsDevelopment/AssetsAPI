// import { profile_options } from "@prisma/client";
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, Max } from "class-validator";
import { profile_options } from "src/modules/common/enum";

export class CreateWorkInvitationDto {

    /**
     * Foreign Key del cliente
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    client_fk: number;

    /**
     * Foreign Key del profesional
     * @example 1
     */
    @IsNumber()
    @IsPositive()
    @Max(2147483647)
    professional_fk: number;

    /**
     * Rol del usuario
     * @example "coordinador"
     */
    @IsString()
    sender: profile_options

    /**
     * Estado de la invitación
     * @example true
     */
    @IsOptional()
    @IsBoolean()
    is_accept?: boolean = false;
}
