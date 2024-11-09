import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'
import { HttpServer } from '../src/Provider/HttpServer'
import supertest from 'supertest'
import { DatabaseClient } from '../src/Provider/PostgresDB'
import { log } from 'console'

describe('employee api', () => {
  beforeAll(async () => {
    await DatabaseClient.initialize()
  })

  it('should fetch all employees with hierarchy', async () => {
    const result = await supertest(HttpServer).get(`/employee/all/?id=1`)
    log('employee', JSON.stringify(result.body, null, 2))
    expect(result.status).toBe(200)
    expect(result).toBeTruthy()
  })

  afterAll(done => {
    DatabaseClient.destroy()
    done()
  })
})
