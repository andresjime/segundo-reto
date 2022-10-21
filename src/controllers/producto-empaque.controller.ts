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
  Empaque,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoEmpaqueController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/empaque', {
    responses: {
      '200': {
        description: 'Empaque belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empaque)},
          },
        },
      },
    },
  })
  async getEmpaque(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<Empaque> {
    return this.productoRepository.empaque(id);
  }
}
