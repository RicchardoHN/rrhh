import {Entity, model, property} from '@loopback/repository';

@model()
export class Vacante extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPlaza?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombrePlaza: string;

  @property({
    type: 'number',
    required: true,
  })
  sueldo: number;

  @property({
    type: 'string',
    required: true,
  })
  jefe: string;

  @property({
    type: 'string',
    required: true,
  })
  ubicacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFinal: string;


  constructor(data?: Partial<Vacante>) {
    super(data);
  }
}

export interface VacanteRelations {
  // describe navigational properties here
}

export type VacanteWithRelations = Vacante & VacanteRelations;
