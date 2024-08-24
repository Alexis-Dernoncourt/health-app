import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
// import { __prod__ } from './constants';

const config: MikroOrmModuleOptions = {
  entities: ['./dist/**/*.entity.js'], // chemin vers les entités compilées
  entitiesTs: ['./src/**/*.entity.ts'], // chemin vers les entités TypeScript
  driver: PostgreSqlDriver,
  dbName: 'health-app',
  user: 'admin',
  password: 'admin',
  debug: true,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: './database/migrations', // chemin vers les migrations
  },
};

export default config;
