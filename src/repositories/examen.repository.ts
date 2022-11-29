import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {RrhhDataSource} from '../datasources';
import {Examen, ExamenRelations, Participante} from '../models';
import {ParticipanteRepository} from './participante.repository';

export class ExamenRepository extends DefaultCrudRepository<
  Examen,
  typeof Examen.prototype.idPlaza,
  ExamenRelations
> {

  public readonly participante: BelongsToAccessor<Participante, typeof Examen.prototype.idPlaza>;

  constructor(
    @inject('datasources.rrhh') dataSource: RrhhDataSource, @repository.getter('ParticipanteRepository') protected participanteRepositoryGetter: Getter<ParticipanteRepository>,
  ) {
    super(Examen, dataSource);
    this.participante = this.createBelongsToAccessorFor('participante', participanteRepositoryGetter,);
    this.registerInclusionResolver('participante', this.participante.inclusionResolver);
  }
}
