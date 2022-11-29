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
import {Competencia} from '../models';
import {CompetenciaRepository} from '../repositories';

export class CompetenciaController {
  constructor(
    @repository(CompetenciaRepository)
    public competenciaRepository : CompetenciaRepository,
  ) {}

  @post('/competencias')
  @response(200, {
    description: 'Competencia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Competencia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Competencia, {
            title: 'NewCompetencia',
            exclude: ['id'],
          }),
        },
      },
    })
    competencia: Omit<Competencia, 'id'>,
  ): Promise<Competencia> {
    return this.competenciaRepository.create(competencia);
  }

  @get('/competencias/count')
  @response(200, {
    description: 'Competencia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Competencia) where?: Where<Competencia>,
  ): Promise<Count> {
    return this.competenciaRepository.count(where);
  }

  @get('/competencias')
  @response(200, {
    description: 'Array of Competencia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Competencia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Competencia) filter?: Filter<Competencia>,
  ): Promise<Competencia[]> {
    return this.competenciaRepository.find(filter);
  }

  @patch('/competencias')
  @response(200, {
    description: 'Competencia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Competencia, {partial: true}),
        },
      },
    })
    competencia: Competencia,
    @param.where(Competencia) where?: Where<Competencia>,
  ): Promise<Count> {
    return this.competenciaRepository.updateAll(competencia, where);
  }

  @get('/competencias/{id}')
  @response(200, {
    description: 'Competencia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Competencia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Competencia, {exclude: 'where'}) filter?: FilterExcludingWhere<Competencia>
  ): Promise<Competencia> {
    return this.competenciaRepository.findById(id, filter);
  }

  @patch('/competencias/{id}')
  @response(204, {
    description: 'Competencia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Competencia, {partial: true}),
        },
      },
    })
    competencia: Competencia,
  ): Promise<void> {
    await this.competenciaRepository.updateById(id, competencia);
  }

  @put('/competencias/{id}')
  @response(204, {
    description: 'Competencia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() competencia: Competencia,
  ): Promise<void> {
    await this.competenciaRepository.replaceById(id, competencia);
  }

  @del('/competencias/{id}')
  @response(204, {
    description: 'Competencia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.competenciaRepository.deleteById(id);
  }
}
