import { profile_options } from "@prisma/client";
import { IsBoolean, IsNumber, IsOptional, IsPositive, Max } from "class-validator";

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
     */
    sender: profile_options

    /**
     * Estado de la invitación
     * @example true
     */
    @IsOptional()
    @IsBoolean()
    is_accept?: boolean = false;
}
