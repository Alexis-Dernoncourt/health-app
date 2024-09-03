import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'
import fs from 'node:fs'

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
          ca: fs.readFileSync('database/ssl/eu-north-1-bundle.pem').toString(),
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
