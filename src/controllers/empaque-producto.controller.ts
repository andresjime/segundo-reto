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
  Empaque,
  Producto,
} from '../models';
import {EmpaqueRepository} from '../repositories';

export class EmpaqueProductoController {
  constructor(
    @repository(EmpaqueRepository) protected empaqueRepository: EmpaqueRepository,
  ) { }

  @get('/empaques/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Empaque has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.empaqueRepository.productos(id).find(filter);
  }

  @post('/empaques/{id}/productos', {
    responses: {
      '200': {
        description: 'Empaque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empaque.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInEmpaque',
            exclude: ['id'],
            optional: ['empaqueId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.empaqueRepository.productos(id).create(producto);
  }

  @patch('/empaques/{id}/productos', {
    responses: {
      '200': {
        description: 'Empaque.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.empaqueRepository.productos(id).patch(producto, where);
  }

  @del('/empaques/{id}/productos', {
    responses: {
      '200': {
        description: 'Empaque.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.empaqueRepository.productos(id).delete(where);
  }
}
