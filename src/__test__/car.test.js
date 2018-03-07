const request = require('supertest')
const server = require('../server')
const Car = require('../models/cars')

process.env.NODE_ENV = 'test'

let car

beforeAll(async () => {
  await Car.remove({})
  car = {}
})

afterEach(async () => {
  await Car.remove({})
  car = {}
})

beforeEach(() => {
  car = {
    maker: 'Lamborghini',
    model: 'Diablo',
    year: 1991
  }
})

describe('CAR test suit', () => {
  test('GET /cars', async () => {
    const response = await request(server).get('/cars')
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('cars')
    expect(response.body.cars).toHaveLength(0)
  })

  describe('POST /cars', () => {
    test('should create a Car', async () => {
      const response = await request(server).post('/cars').send(car)
      expect(response.statusCode).toBe(201)
      expect(response.body).toHaveProperty('car')
      expect(response.body.car).toMatchObject(car)
    })

    test('shouldn\'t create a car if maker is missing', async () => {
      const otherCar = {
        model: 'Countach',
        year: 1978
      }
      const response = await request(server).post('/cars').send(otherCar)
      expect(response.statusCode).toBe(401)
      expect(response.body.success).toBeFalsy()
      expect(response.body.car).toBeUndefined()
    })

    test('shouldn\'t create a car if model is missing', async () => {
      const otherCar = {
        maker: 'Lamborghini',
        year: 1978
      }
      const response = await request(server).post('/cars').send(otherCar)
      expect(response.statusCode).toBe(401)
      expect(response.body.success).toBeFalsy()
      expect(response.body.car).toBeUndefined()
    })
  })

  test('GET /cars/{id}', async () => {
    const model = new Car(car)
    const newCar = await model.save()
    const response = await request(server).get(`/cars/${newCar._id}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('car')
    expect(response.body.car).toMatchObject(car)
  })

  describe('PUT /cars/{id}', () => {
    test('should update a Car', async () => {
      const otherCar = {
        maker: 'Lamborghini',
        model: 'Countach',
        year: 1978
      }
      const model = new Car(car)
      const newCar = await model.save()
      const response = await request(server).put(`/cars/${newCar._id}`).send(otherCar)
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toBeTruthy()
    })

    test('should\'t update a Car if maker is missing', async () => {
      const otherCar = {
        model: 'Countach',
        year: 1978
      }
      const model = new Car(car)
      const newCar = await model.save()
      const response = await request(server).put(`/cars/${newCar._id}`).send(otherCar)
      expect(response.statusCode).toBe(401)
      expect(response.body.car).toBeUndefined()
    })

    test('should\' update a Car if model is missing', async () => {
      const otherCar = {
        maker: 'Lamborghini',
        year: 1978
      }
      const model = new Car(car)
      const newCar = await model.save()
      const response = await request(server).put(`/cars/${newCar._id}`).send(otherCar)
      expect(response.statusCode).toBe(401)
      expect(response.body.car).toBeUndefined()
    })
  })

  test('PATCH /cars/{id}', async () => {
    const otherCar = {
      model: 'Countach',
    }
    const model = new Car(car)
    const newCar = await model.save()
    const response = await request(server).patch(`/cars/${newCar._id}`).send(otherCar)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('success')
    expect(response.body.success).toBeTruthy()
  })

  test('DEL /cars/{id}', async () => {
    const model = new Car(car)
    const newCar = await model.save()
    const response = await request(server).delete(`/cars/${newCar._id}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.car).toBeUndefined()
  })
})