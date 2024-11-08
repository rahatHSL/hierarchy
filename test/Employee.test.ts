import supertest from 'supertest'
import { DatabaseClient } from '../src/Provider/PostgresDB'

describe('employee repository', () => {
  beforeAll(async () => {
    await DatabaseClient.initialize()
  })
  it('should fetch employee', async () => {})

  afterAll(done => {
    DatabaseClient.destroy()
    done()
  })
})
