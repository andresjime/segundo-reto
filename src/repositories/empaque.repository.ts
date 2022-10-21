import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empaque, EmpaqueRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class EmpaqueRepository extends DefaultCrudRepository<
  Empaque,
  typeof Empaque.prototype.id,
  EmpaqueRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Empaque.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Empaque, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
