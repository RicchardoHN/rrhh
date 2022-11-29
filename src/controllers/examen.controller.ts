import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Examen} from '../models';
import {ExamenRepository} from '../repositories';

export class ExamenController {
  constructor(
    @repository(ExamenRepository)
    public examenRepository : ExamenRepository,
  ) {}

  @post('/examen')
  @response(200, {
    description: 'Examen model instance',
    content: {'application/json': {schema: getModelSchemaRef(Examen)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Examen, {
            title: 'NewExamen',
            exclude: ['id'],
          }),
        },
      },
    })
    examen: Omit<Examen, 'id'>,
  ): Promise<Examen> {
    return this.examenRepository.create(examen);
  }

  @get('/examen/count')
  @response(200, {
    description: 'Examen model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Examen) where?: Where<Examen>,
  ): Promise<Count> {
    return this.examenRepository.count(where);
  }

  @get('/examen')
  @response(200, {
    description: 'Array of Examen model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Examen, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Examen) filter?: Filter<Examen>,
  ): Promise<Examen[]> {
    return this.examenRepository.find(filter);
  }

  @patch('/examen')
  @response(200, {
    description: 'Examen PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Examen, {partial: true}),
        },
      },
    })
    examen: Examen,
    @param.where(Examen) where?: Where<Examen>,
  ): Promise<Count> {
    return this.examenRepository.updateAll(examen, where);
  }

  @get('/examen/{id}')
  @response(200, {
    description: 'Examen model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Examen, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Examen, {exclude: 'where'}) filter?: FilterExcludingWhere<Examen>
  ): Promise<Examen> {
    return this.examenRepository.findById(id, filter);
  }

  @patch('/examen/{id}')
  @response(204, {
    description: 'Examen PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Examen, {partial: true}),
        },
      },
    })
    examen: Examen,
  ): Promise<void> {
    await this.examenRepository.updateById(id, examen);
  }

  @put('/examen/{id}')
  @response(204, {
    description: 'Examen PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() examen: Examen,
  ): Promise<void> {
    await this.examenRepository.replaceById(id, examen);
  }

  @del('/examen/{id}')
  @response(204, {
    description: 'Examen DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.examenRepository.deleteById(id);
  }
}
