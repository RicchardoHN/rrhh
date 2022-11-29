import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RrhhDataSource} from '../datasources';
import {Competencia, CompetenciaRelations} from '../models';

export class CompetenciaRepository extends DefaultCrudRepository<
  Competencia,
  typeof Competencia.prototype.idPlaza,
  CompetenciaRelations
> {
  constructor(
    @inject('datasources.rrhh') dataSource: RrhhDataSource,
  ) {
    super(Competencia, dataSource);
  }
}
