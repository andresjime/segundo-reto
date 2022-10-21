import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Cliente, Empaque} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EmpaqueRepository} from './empaque.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Producto.prototype.id>;

  public readonly empaque: BelongsToAccessor<Empaque, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EmpaqueRepository') protected empaqueRepositoryGetter: Getter<EmpaqueRepository>,
  ) {
    super(Producto, dataSource);
    this.empaque = this.createBelongsToAccessorFor('empaque', empaqueRepositoryGetter,);
    this.registerInclusionResolver('empaque', this.empaque.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
