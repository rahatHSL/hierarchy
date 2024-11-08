import 'reflect-metadata'
require('dotenv').config()

import { HttpServer } from './Provider/HttpServer'
import { DatabaseClient } from './Provider/PostgresDB'

HttpServer.listen(process.env.HTTP_PORT, async () => {
  await DatabaseClient.initialize()

  console.log(`HTTP server is running on port: ${process.env.HTTP_PORT}`)
})
