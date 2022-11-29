import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {RrhhDataSource} from '../datasources';
import {Participante, ParticipanteRelations, Vacante, Examen, Competencia} from '../models';
import {VacanteRepository} from './vacante.repository';
import {ExamenRepository} from './examen.repository';
import {CompetenciaRepository} from './competencia.repository';

export class ParticipanteRepository extends DefaultCrudRepository<
  Participante,
  typeof Participante.prototype.idPlaza,
  ParticipanteRelations
> {

  public readonly vacantes: HasManyRepositoryFactory<Vacante, typeof Participante.prototype.idPlaza>;

  public readonly examen: HasManyRepositoryFactory<Examen, typeof Participante.prototype.idPlaza>;

  public readonly competencias: HasManyRepositoryFactory<Competencia, typeof Participante.prototype.idPlaza>;

  constructor(
    @inject('datasources.rrhh') dataSource: RrhhDataSource, @repository.getter('VacanteRepository') protected vacanteRepositoryGetter: Getter<VacanteRepository>, @repository.getter('ExamenRepository') protected examenRepositoryGetter: Getter<ExamenRepository>, @repository.getter('CompetenciaRepository') protected competenciaRepositoryGetter: Getter<CompetenciaRepository>,
  ) {
    super(Participante, dataSource);
    this.competencias = this.createHasManyRepositoryFactoryFor('competencias', competenciaRepositoryGetter,);
    this.registerInclusionResolver('competencias', this.competencias.inclusionResolver);
    this.examen = this.createHasManyRepositoryFactoryFor('examen', examenRepositoryGetter,);
    this.registerInclusionResolver('examen', this.examen.inclusionResolver);
    this.vacantes = this.createHasManyRepositoryFactoryFor('vacantes', vacanteRepositoryGetter,);
    this.registerInclusionResolver('vacantes', this.vacantes.inclusionResolver);
  }
}
