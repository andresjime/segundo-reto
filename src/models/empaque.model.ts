import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';

@model()
export class Empaque extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_empaque: string;

  @property({
    type: 'number',
    required: true,
  })
  magnitud: number;

  @hasMany(() => Producto)
  productos: Producto[];

  constructor(data?: Partial<Empaque>) {
    super(data);
  }
}

export interface EmpaqueRelations {
  // describe navigational properties here
}

export type EmpaqueWithRelations = Empaque & EmpaqueRelations;
