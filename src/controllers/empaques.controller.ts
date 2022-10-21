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
import {Empaque} from '../models';
import {EmpaqueRepository} from '../repositories';

export class EmpaquesController {
  constructor(
    @repository(EmpaqueRepository)
    public empaqueRepository : EmpaqueRepository,
  ) {}

  @post('/empaques')
  @response(200, {
    description: 'Empaque model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empaque)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empaque, {
            title: 'NewEmpaque',
            exclude: ['id'],
          }),
        },
      },
    })
    empaque: Omit<Empaque, 'id'>,
  ): Promise<Empaque> {
    return this.empaqueRepository.create(empaque);
  }

  @get('/empaques/count')
  @response(200, {
    description: 'Empaque model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empaque) where?: Where<Empaque>,
  ): Promise<Count> {
    return this.empaqueRepository.count(where);
  }

  @get('/empaques')
  @response(200, {
    description: 'Array of Empaque model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empaque, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empaque) filter?: Filter<Empaque>,
  ): Promise<Empaque[]> {
    return this.empaqueRepository.find(filter);
  }

  @patch('/empaques')
  @response(200, {
    description: 'Empaque PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empaque, {partial: true}),
        },
      },
    })
    empaque: Empaque,
    @param.where(Empaque) where?: Where<Empaque>,
  ): Promise<Count> {
    return this.empaqueRepository.updateAll(empaque, where);
  }

  @get('/empaques/{id}')
  @response(200, {
    description: 'Empaque model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empaque, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empaque, {exclude: 'where'}) filter?: FilterExcludingWhere<Empaque>
  ): Promise<Empaque> {
    return this.empaqueRepository.findById(id, filter);
  }

  @patch('/empaques/{id}')
  @response(204, {
    description: 'Empaque PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empaque, {partial: true}),
        },
      },
    })
    empaque: Empaque,
  ): Promise<void> {
    await this.empaqueRepository.updateById(id, empaque);
  }

  @put('/empaques/{id}')
  @response(204, {
    description: 'Empaque PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empaque: Empaque,
  ): Promise<void> {
    await this.empaqueRepository.replaceById(id, empaque);
  }

  @del('/empaques/{id}')
  @response(204, {
    description: 'Empaque DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empaqueRepository.deleteById(id);
  }
}
