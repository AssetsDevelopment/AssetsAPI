import { Resolver } from '@nestjs/graphql';
import { ClientHasProfessionalService } from './client_has_professional.service';

@Resolver()
export class ClientHasProfessionalResolver {
  constructor(private readonly clientHasProfessionalService: ClientHasProfessionalService) {}
}
