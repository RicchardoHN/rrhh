import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RrhhDataSource} from '../datasources';
import {Examen, ExamenRelations} from '../models';

export class ExamenRepository extends DefaultCrudRepository<
  Examen,
  typeof Examen.prototype.idPlaza,
  ExamenRelations
> {
  constructor(
    @inject('datasources.rrhh') dataSource: RrhhDataSource,
  ) {
    super(Examen, dataSource);
  }
}
