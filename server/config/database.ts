import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'
import fs from 'node:fs'
import { join } from 'node:path'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
        ssl: {
          ca: fs
            // eslint-disable-next-line unicorn/prefer-module
            .readFileSync(join(__dirname, '..', 'database/ssl/', 'eu-north-1-bundle.pem'))
            .toString(),
          rejectUnauthorized: false,
        },
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
