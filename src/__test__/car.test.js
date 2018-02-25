const request = require('supertest')
const server = require('../server')


describe('public paths', () => {
  test('GET /cars', async () => {
    const response = await request(server).get('/ping')
    expect(response.statusCode).toBe(200)
  })
})