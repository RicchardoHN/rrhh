import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vacante} from './vacante.model';
import {Examen} from './examen.model';
import {Competencia} from './competencia.model';

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

  @hasMany(() => Vacante)
  vacantes: Vacante[];

  @hasMany(() => Examen)
  examen: Examen[];

  @hasMany(() => Competencia)
  competencias: Competencia[];

  constructor(data?: Partial<Participante>) {
    super(data);
  }
}

export interface ParticipanteRelations {
  // describe navigational properties here
}

export type ParticipanteWithRelations = Participante & ParticipanteRelations;
