import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Examen,
  Participante,
} from '../models';
import {ExamenRepository} from '../repositories';

export class ExamenParticipanteController {
  constructor(
    @repository(ExamenRepository)
    public examenRepository: ExamenRepository,
  ) { }

  @get('/examen/{id}/participante', {
    responses: {
      '200': {
        description: 'Participante belonging to Examen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Participante)},
          },
        },
      },
    },
  })
  async getParticipante(
    @param.path.string('id') id: typeof Examen.prototype.idPlaza,
  ): Promise<Participante> {
    return this.examenRepository.participante(id);
  }
}
