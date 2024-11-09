import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'
import { HttpServer } from '../src/Provider/HttpServer'
import supertest from 'supertest'
import { DatabaseClient } from '../src/Provider/PostgresDB'
import { log } from 'console'

describe('employee api', () => {
  beforeAll(async () => {
    await DatabaseClient.initialize()
  })

  it('should fetch all employees with valid auth', async () => {
    const loginData = await supertest(HttpServer)
      .post('/auth/login')
      .send({ pass: 'demo_credentials' })
    const result = await supertest(HttpServer)
      .get(`/employee/all/?id=1`)
      .set('Authorization', `Bearer ${loginData.body.token}`)

    log('employee', JSON.stringify(result.body, null, 2))

    expect(loginData.status).toBe(200)
    expect(result.status).toBe(200)
    expect(result).toBeTruthy()
  })

  it('should not fetch all employees with hierarchy without valid auth', async () => {
    const result = await supertest(HttpServer).get(`/employee/all/?id=1`)
    log('employee', JSON.stringify(result.body, null, 2))
    expect(result.status).toBe(400)
    expect(result).toBeTruthy()
  })

  afterAll(done => {
    DatabaseClient.destroy()
    done()
  })
})
