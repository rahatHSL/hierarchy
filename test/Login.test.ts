import { describe, expect, it, beforeAll, afterAll } from '@jest/globals'
import { HttpServer } from '../src/Provider/HttpServer'
import supertest from 'supertest'
import { DatabaseClient } from '../src/Provider/PostgresDB'
import { log } from 'console'

describe('login api', () => {
  beforeAll(async () => {
    await DatabaseClient.initialize()
  })

  it('should login', async () => {
    const result = await supertest(HttpServer)
      .post('/auth/login')
      .send({ pass: 'demo_credentials' })
    log('login', JSON.stringify(result.body, null, 2))
    expect(result.status).toBe(200)
    expect(result).toBeTruthy()
  })

  it('should not login with invalid credentials', async () => {
    const result = await supertest(HttpServer).post('/auth/login').send({ pass: 'random' })
    log('login', JSON.stringify(result.body, null, 2))
    expect(result.body.message).toBe('Invalid credentials')
    expect(result.status).toBe(400)
    expect(result).toBeTruthy()
  })

  it('should not login with empty credentials', async () => {
    const result = await supertest(HttpServer).post('/auth/login').send({ pass: '' })
    log('login', JSON.stringify(result.body, null, 2))
    expect(result.body.message).toBe('Validation Error')
    expect(result.status).toBe(422)
    expect(result).toBeTruthy()
  })

  afterAll(done => {
    DatabaseClient.destroy()
    done()
  })
})
