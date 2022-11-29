import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RrhhDataSource} from '../datasources';
import {Vacante, VacanteRelations} from '../models';

export class VacanteRepository extends DefaultCrudRepository<
  Vacante,
  typeof Vacante.prototype.idPlaza,
  VacanteRelations
> {
  constructor(
    @inject('datasources.rrhh') dataSource: RrhhDataSource,
  ) {
    super(Vacante, dataSource);
  }
}
