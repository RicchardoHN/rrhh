import {Entity, model, property} from '@loopback/repository';

@model()
export class Participante extends Entity {
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
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;


  constructor(data?: Partial<Participante>) {
    super(data);
  }
}

export interface ParticipanteRelations {
  // describe navigational properties here
}

export type ParticipanteWithRelations = Participante & ParticipanteRelations;
