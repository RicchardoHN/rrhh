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
  Vacante,
} from '../models';
import {ParticipanteRepository} from '../repositories';

export class ParticipanteVacanteController {
  constructor(
    @repository(ParticipanteRepository) protected participanteRepository: ParticipanteRepository,
  ) { }

  @get('/participantes/{id}/vacantes', {
    responses: {
      '200': {
        description: 'Array of Participante has many Vacante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vacante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vacante>,
  ): Promise<Vacante[]> {
    return this.participanteRepository.vacantes(id).find(filter);
  }

  @post('/participantes/{id}/vacantes', {
    responses: {
      '200': {
        description: 'Participante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vacante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Participante.prototype.idPlaza,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacante, {
            title: 'NewVacanteInParticipante',
            exclude: ['idPlaza'],
            optional: ['participanteId']
          }),
        },
      },
    }) vacante: Omit<Vacante, 'idPlaza'>,
  ): Promise<Vacante> {
    return this.participanteRepository.vacantes(id).create(vacante);
  }

  @patch('/participantes/{id}/vacantes', {
    responses: {
      '200': {
        description: 'Participante.Vacante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacante, {partial: true}),
        },
      },
    })
    vacante: Partial<Vacante>,
    @param.query.object('where', getWhereSchemaFor(Vacante)) where?: Where<Vacante>,
  ): Promise<Count> {
    return this.participanteRepository.vacantes(id).patch(vacante, where);
  }

  @del('/participantes/{id}/vacantes', {
    responses: {
      '200': {
        description: 'Participante.Vacante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vacante)) where?: Where<Vacante>,
  ): Promise<Count> {
    return this.participanteRepository.vacantes(id).delete(where);
  }
}
