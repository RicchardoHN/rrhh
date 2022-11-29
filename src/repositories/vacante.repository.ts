import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {RrhhDataSource} from '../datasources';
import {Vacante, VacanteRelations, Participante} from '../models';
import {ParticipanteRepository} from './participante.repository';

export class VacanteRepository extends DefaultCrudRepository<
  Vacante,
  typeof Vacante.prototype.idPlaza,
  VacanteRelations
> {

  public readonly participante: BelongsToAccessor<Participante, typeof Vacante.prototype.idPlaza>;

  constructor(
    @inject('datasources.rrhh') dataSource: RrhhDataSource, @repository.getter('ParticipanteRepository') protected participanteRepositoryGetter: Getter<ParticipanteRepository>,
  ) {
    super(Vacante, dataSource);
    this.participante = this.createBelongsToAccessorFor('participante', participanteRepositoryGetter,);
    this.registerInclusionResolver('participante', this.participante.inclusionResolver);
  }
}
