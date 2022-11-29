import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Competencia,
  Participante,
} from '../models';
import {CompetenciaRepository} from '../repositories';

export class CompetenciaParticipanteController {
  constructor(
    @repository(CompetenciaRepository)
    public competenciaRepository: CompetenciaRepository,
  ) { }

  @get('/competencias/{id}/participante', {
    responses: {
      '200': {
        description: 'Participante belonging to Competencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Participante)},
          },
        },
      },
    },
  })
  async getParticipante(
    @param.path.string('id') id: typeof Competencia.prototype.idPlaza,
  ): Promise<Participante> {
    return this.competenciaRepository.participante(id);
  }
}
