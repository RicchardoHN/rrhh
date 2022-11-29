import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RrhhDataSource} from '../datasources';
import {Participante, ParticipanteRelations} from '../models';

export class ParticipanteRepository extends DefaultCrudRepository<
  Participante,
  typeof Participante.prototype.idPlaza,
  ParticipanteRelations
> {
  constructor(
    @inject('datasources.rrhh') dataSource: RrhhDataSource,
  ) {
    super(Participante, dataSource);
  }
}
