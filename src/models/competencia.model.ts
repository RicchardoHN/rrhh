import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Participante} from './participante.model';

@model()
export class Competencia extends Entity {
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
  escolaridad: string;

  @property({
    type: 'string',
    required: true,
  })
  idiomas: string;

  @property({
    type: 'number',
    required: true,
  })
  puntaje: number;

  @belongsTo(() => Participante)
  participanteId: string;

  constructor(data?: Partial<Competencia>) {
    super(data);
  }
}

export interface CompetenciaRelations {
  // describe navigational properties here
}

export type CompetenciaWithRelations = Competencia & CompetenciaRelations;
