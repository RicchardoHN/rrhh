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
import {Vacante} from '../models';
import {VacanteRepository} from '../repositories';

export class VacanteController {
  constructor(
    @repository(VacanteRepository)
    public vacanteRepository : VacanteRepository,
  ) {}

  @post('/vacantes')
  @response(200, {
    description: 'Vacante model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vacante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacante, {
            title: 'NewVacante',
            exclude: ['idPlaza'],
          }),
        },
      },
    })
    vacante: Omit<Vacante, 'id'>,
  ): Promise<Vacante> {
    return this.vacanteRepository.create(vacante);
  }

  @get('/vacantes/count')
  @response(200, {
    description: 'Vacante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vacante) where?: Where<Vacante>,
  ): Promise<Count> {
    return this.vacanteRepository.count(where);
  }

  @get('/vacantes')
  @response(200, {
    description: 'Array of Vacante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vacante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vacante) filter?: Filter<Vacante>,
  ): Promise<Vacante[]> {
    return this.vacanteRepository.find(filter);
  }

  @patch('/vacantes')
  @response(200, {
    description: 'Vacante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacante, {partial: true}),
        },
      },
    })
    vacante: Vacante,
    @param.where(Vacante) where?: Where<Vacante>,
  ): Promise<Count> {
    return this.vacanteRepository.updateAll(vacante, where);
  }

  @get('/vacantes/{id}')
  @response(200, {
    description: 'Vacante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vacante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vacante, {exclude: 'where'}) filter?: FilterExcludingWhere<Vacante>
  ): Promise<Vacante> {
    return this.vacanteRepository.findById(id, filter);
  }

  @patch('/vacantes/{id}')
  @response(204, {
    description: 'Vacante PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacante, {partial: true}),
        },
      },
    })
    vacante: Vacante,
  ): Promise<void> {
    await this.vacanteRepository.updateById(id, vacante);
  }

  @put('/vacantes/{id}')
  @response(204, {
    description: 'Vacante PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vacante: Vacante,
  ): Promise<void> {
    await this.vacanteRepository.replaceById(id, vacante);
  }

  @del('/vacantes/{id}')
  @response(204, {
    description: 'Vacante DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vacanteRepository.deleteById(id);
  }
}
