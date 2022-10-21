import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Cliente,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoClienteController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<Cliente> {
    return this.productoRepository.cliente(id);
  }
}
