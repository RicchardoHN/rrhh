import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Participante} from './participante.model';

@model()
export class Examen extends Entity {
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
  idParticipante: string;

  @property({
    type: 'number',
    required: true,
  })
  puntaje: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Participante)
  participanteId: string;

  constructor(data?: Partial<Examen>) {
    super(data);
  }
}

export interface ExamenRelations {
  // describe navigational properties here
}

export type ExamenWithRelations = Examen & ExamenRelations;
