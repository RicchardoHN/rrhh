import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Participante,
  Competencia,
} from '../models';
import {ParticipanteRepository} from '../repositories';

export class ParticipanteCompetenciaController {
  constructor(
    @repository(ParticipanteRepository) protected participanteRepository: ParticipanteRepository,
  ) { }

  @get('/participantes/{id}/competencias', {
    responses: {
      '200': {
        description: 'Array of Participante has many Competencia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Competencia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Competencia>,
  ): Promise<Competencia[]> {
    return this.participanteRepository.competencias(id).find(filter);
  }

  @post('/participantes/{id}/competencias', {
    responses: {
      '200': {
        description: 'Participante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Competencia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Participante.prototype.idPlaza,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Competencia, {
            title: 'NewCompetenciaInParticipante',
            exclude: ['idPlaza'],
            optional: ['participanteId']
          }),
        },
      },
    }) competencia: Omit<Competencia, 'idPlaza'>,
  ): Promise<Competencia> {
    return this.participanteRepository.competencias(id).create(competencia);
  }

  @patch('/participantes/{id}/competencias', {
    responses: {
      '200': {
        description: 'Participante.Competencia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Competencia, {partial: true}),
        },
      },
    })
    competencia: Partial<Competencia>,
    @param.query.object('where', getWhereSchemaFor(Competencia)) where?: Where<Competencia>,
  ): Promise<Count> {
    return this.participanteRepository.competencias(id).patch(competencia, where);
  }

  @del('/participantes/{id}/competencias', {
    responses: {
      '200': {
        description: 'Participante.Competencia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Competencia)) where?: Where<Competencia>,
  ): Promise<Count> {
    return this.participanteRepository.competencias(id).delete(where);
  }
}
