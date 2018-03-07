const request = require('supertest')
const server = require('../server')
const User = require('../models/users')
const Cars = require('../models/cars')

process.env.NODE_ENV = 'test'

let car
let user

beforeAll(async () => {
  await Cars.remove({})
  await User.remove({})
})

afterEach(async () => {
  await Cars.remove({})
  await User.remove({})
  car = {}
  user = {}
})

beforeEach(() => {
  car = {
    maker: 'Lamborghini',
    model: 'Diablo',
    year: 1991
  }
  user = {
    firstname: 'Jhon',
    lastname: 'Smith',
    email: 'jsmith@mail.com'
  }
})

describe('USER test suit', () => {
  test('GET /users', async () => {
    const response = await request(server).get('/users')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('users')
    expect(response.body.users).toHaveLength(0)
  })

  describe('POST /users', () => {
    test('should create a User', async () => {
      const response = await request(server).post('/users').send(user)
      expect(response.statusCode).toBe(201)
      expect(response.body).toHaveProperty('user')
      expect(response.body.user).toMatchObject(user)
    })

    test('shouldn\'t create a User if firstname is missing', async () => {
      const otherUser = {
        lastname: 'Doe',
        email: 'jdoe@mail.com'
      }
      const response = await request(server).post('/users').send(otherUser)
      expect(response.statusCode).toBe(401)
      expect(response.body.success).toBeFalsy()
      expect(response.body.user).toBeUndefined()
    })

    test('shouldn\'t create a User if lastname is missing', async () => {
      const otherUser = {
        firstname: 'Jhon',
        email: 'jdoe@mail.com'
      }
      const response = await request(server).post('/users').send(otherUser)
      expect(response.statusCode).toBe(401)
      expect(response.body.success).toBeFalsy()
      expect(response.body.user).toBeUndefined()
    })

    test('shouldn\'t create a User if email is missing', async () => {
      const otherUser = {
        firstname: 'Jhon',
        lastname: 'Doe'
      }
      const response = await request(server).post('/users').send(otherUser)
      expect(response.statusCode).toBe(401)
      expect(response.body.success).toBeFalsy()
      expect(response.body.user).toBeUndefined()
    })
  })

  test('GET /users/{id}', async () => {
    const model = new User(user)
    const newUser = await model.save()
    const response = await request(server).get(`/users/${newUser._id}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('user')
    expect(response.body.user).toMatchObject(user)
  })

  describe('PUT /users/{id}', () => {
    test('should update a User', async () => {
      const otherUser = {
        firstname: 'Jhon',
        lastname: 'Doe',
        email: 'jdoe@mail.com'
      }
      const model = new User(user)
      const newUser = await model.save()
      const response = await request(server).put(`/users/${newUser._id}`).send(otherUser)
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toBeTruthy()
    })

    test('should\'t update a User if firstname is missing', async () => {
      const otherUser = {
        lastname: 'Doe',
        email: 'jdoe@mail.com'
      }
      const model = new User(user)
      const newUser = await model.save()
      const response = await request(server).put(`/users/${newUser._id}`).send(otherUser)
      expect(response.statusCode).toBe(401)
      expect(response.body.user).toBeUndefined()
    })

    test('should\'t update a User if lastname is missing', async () => {
      const otherUser = {
        firstname: 'Jhon',
        email: 'jdoe@mail.com'
      }
      const model = new User(user)
      const newUser = await model.save()
      const response = await request(server).put(`/users/${newUser._id}`).send(otherUser)
      expect(response.statusCode).toBe(401)
      expect(response.body.user).toBeUndefined()
    })

    test('should\'t update a User if email is missing', async () => {
      const otherUser = {
        firstname: 'Jhon',
        lastname: 'Doe,'
      }
      const model = new User(user)
      const newUser = await model.save()
      const response = await request(server).put(`/users/${newUser._id}`).send(otherUser)
      expect(response.statusCode).toBe(401)
      expect(response.body.user).toBeUndefined()
    })
  })
})