import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'rrhh',
  connector: 'mongodb',
  url: 'mongodb+srv://rrhh:prueba2@cluster0.khfmhot.mongodb.net/rrhh ',
  host: 'cluster0.khfmhot.mongodb.net/rrhh',
  port: 27017,
  user: 'rrhh',
  password: 'prueba2',
  database: 'rrhh',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RrhhDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'rrhh';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.rrhh', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
