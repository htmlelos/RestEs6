const request = require('supertest')
const server = require('../server')

describe.skip('public paths', () => {
  test('GET /ping', async () => {
    const response = await request(server).get('/ping')
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('pong')
  })
})