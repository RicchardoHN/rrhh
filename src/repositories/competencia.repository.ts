import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {RrhhDataSource} from '../datasources';
import {Competencia, CompetenciaRelations, Participante} from '../models';
import {ParticipanteRepository} from './participante.repository';

export class CompetenciaRepository extends DefaultCrudRepository<
  Competencia,
  typeof Competencia.prototype.idPlaza,
  CompetenciaRelations
> {

  public readonly participante: BelongsToAccessor<Participante, typeof Competencia.prototype.idPlaza>;

  constructor(
    @inject('datasources.rrhh') dataSource: RrhhDataSource, @repository.getter('ParticipanteRepository') protected participanteRepositoryGetter: Getter<ParticipanteRepository>,
  ) {
    super(Competencia, dataSource);
    this.participante = this.createBelongsToAccessorFor('participante', participanteRepositoryGetter,);
    this.registerInclusionResolver('participante', this.participante.inclusionResolver);
  }
}
