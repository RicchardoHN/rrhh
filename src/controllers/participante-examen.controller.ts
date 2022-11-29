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
  Examen,
} from '../models';
import {ParticipanteRepository} from '../repositories';

export class ParticipanteExamenController {
  constructor(
    @repository(ParticipanteRepository) protected participanteRepository: ParticipanteRepository,
  ) { }

  @get('/participantes/{id}/examen', {
    responses: {
      '200': {
        description: 'Array of Participante has many Examen',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Examen)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Examen>,
  ): Promise<Examen[]> {
    return this.participanteRepository.examen(id).find(filter);
  }

  @post('/participantes/{id}/examen', {
    responses: {
      '200': {
        description: 'Participante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Examen)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Participante.prototype.idPlaza,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Examen, {
            title: 'NewExamenInParticipante',
            exclude: ['idPlaza'],
            optional: ['participanteId']
          }),
        },
      },
    }) examen: Omit<Examen, 'idPlaza'>,
  ): Promise<Examen> {
    return this.participanteRepository.examen(id).create(examen);
  }

  @patch('/participantes/{id}/examen', {
    responses: {
      '200': {
        description: 'Participante.Examen PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Examen, {partial: true}),
        },
      },
    })
    examen: Partial<Examen>,
    @param.query.object('where', getWhereSchemaFor(Examen)) where?: Where<Examen>,
  ): Promise<Count> {
    return this.participanteRepository.examen(id).patch(examen, where);
  }

  @del('/participantes/{id}/examen', {
    responses: {
      '200': {
        description: 'Participante.Examen DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Examen)) where?: Where<Examen>,
  ): Promise<Count> {
    return this.participanteRepository.examen(id).delete(where);
  }
}
