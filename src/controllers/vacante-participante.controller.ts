import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vacante,
  Participante,
} from '../models';
import {VacanteRepository} from '../repositories';

export class VacanteParticipanteController {
  constructor(
    @repository(VacanteRepository)
    public vacanteRepository: VacanteRepository,
  ) { }

  @get('/vacantes/{id}/participante', {
    responses: {
      '200': {
        description: 'Participante belonging to Vacante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Participante)},
          },
        },
      },
    },
  })
  async getParticipante(
    @param.path.string('id') id: typeof Vacante.prototype.idPlaza,
  ): Promise<Participante> {
    return this.vacanteRepository.participante(id);
  }
}
