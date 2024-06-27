import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfessionalService } from './professional.service';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalInput } from './dto/create-professional.input';
import { UpdateProfessionalInput } from './dto/update-professional.input';

@Resolver(() => Professional)
export class ProfessionalResolver {
  constructor(private readonly professionalService: ProfessionalService) {}

//   @Mutation(() => Professional)
//   createProfessional(@Args('createProfessionalInput') createProfessionalInput: CreateProfessionalInput) {
//     return this.professionalService.create(createProfessionalInput);
//   }

//   @Query(() => [Professional], { name: 'professional' })
//   findAll() {
//     return this.professionalService.findAll();
//   }

  @Query(() => Professional, { name: 'professional' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.professionalService.findOne(id);
  }

//   @Mutation(() => Professional)
//   updateProfessional(@Args('updateProfessionalInput') updateProfessionalInput: UpdateProfessionalInput) {
//     return this.professionalService.update(updateProfessionalInput.id, updateProfessionalInput);
//   }

//   @Mutation(() => Professional)
//   removeProfessional(@Args('id', { type: () => Int }) id: number) {
//     return this.professionalService.remove(id);
//   }
}
