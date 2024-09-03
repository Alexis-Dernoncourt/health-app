import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'
import * as fs from 'node:fs'
import app from '@adonisjs/core/services/app'

const sslCertPath = app.makePath('database/ssl/eu-north-1-bundle.pem')

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
          ca: fs.readFileSync(sslCertPath),
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
