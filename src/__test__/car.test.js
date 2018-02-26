const request = require('supertest')
const server = require('../server')
const Car = require('../models/cars')

process.env.NODE_ENV = 'test'

beforeAll(async () => {
  const result = await Car.remove({})
})

let car = {}

afterEach(async () => {
  const result = await Car.remove({})
  car = {}
})
beforeEach(() => {
  car = {
    maker: 'Lamborghini',
    model: 'Diablo',
    year: 1998
  }
})

describe.only('CAR test suit', () => {
  test('GET /cars', async () => {
    const response = await request(server).get('/cars')
    expect(response.statusCode).toBe(200)
    expect(response.body.cars).toHaveLength(0)
  })
  
  describe.only('POST /cars', () => {
    test('should create a Car', async () => {
      const response = await request(server).post('/cars').send(car)
      expect(response.statusCode).toBe(201)
      expect(response.body.car).toMatchObject(car)
    })
    
    test('shouldn\'t create a car if maker is missing', async () => {
      const otherCar = {
        model: 'Countach',
        year: 1983
      }
      const response = await request(server).post('/cars').send(otherCar)
      expect(response.statusCode).toBe(401)
      expect(response.body.success).toBeFalsy()
      expect(response.body.car).toBeUndefined()
    })
    
    test('shouldn\'t create a car if model is missing', async () => {
      const otherCar = {
        maker: 'Lamborghini',
        year: 1983
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
    expect(response.body.car).toMatchObject(car)
  })

  test('PUT /cars/{id}', async () => {
    const otherCar = {
      maker: 'Lamborghini',
      model: 'Countach',
      year: 1983
    }
    const model = new Car(car)
    const newCar = await model.save()
    const response = await request(server).put(`/cars/${newCar._id}`).send(otherCar)
    expect(response.statusCode).toBe(200)
    expect(response.body.car).toMatchObject(otherCar)
  })

  test('PATCH /cars/{id}', async () => {
    const otherCar = {
      model: 'Countach',
    }
    const model = new Car(car)
    const newCar = await model.save()
    const response = await request(server).patch(`/cars/${newCar._id}`).send(otherCar)
    expect(response.statusCode).toBe(200)
    expect(response.body.car).toMatchObject(otherCar)
    expect(response.body.car.model).toBe(otherCar.model)
  })

  test('DEL /cars/{id}', async () => {
    const model = new Car(car)
    const newCar = await model.save()
    const response = await request(server).delete(`/cars/${newCar._id}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.car).toBeUndefined()
  })
})