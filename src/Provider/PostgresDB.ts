import { DataSource } from 'typeorm'

export const DatabaseClient = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['../Database/model/*.ts'],
  synchronize: false,
  logging: true,
})
