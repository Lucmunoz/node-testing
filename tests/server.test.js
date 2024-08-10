const request = require('supertest')
const server = require('../index')

const randomId = Math.floor(Math.random() * 99999)
const newCoffee = { randomId, nombre: 'Test Coffee' }

describe('Operaciones CRUD de cafes', () => {
  // PUNTO 1
  test('REQ1 [GET /cafes] | DEBE RETORNAR STATUSCODE 200 Y UN ARREGLO CON AL MENOS 1 ELEMENTO (OBJETO)', async () => {
    const response = await request(server).get('/cafes').send()
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
  })

  // PUNTO 2
  test('REQ2 [DELETE /cafes/:id] | DEBERIA RETORNAR ERROR 404 AL INTENTAR ELIMINAR UN CAFE CON ID QUE NO EXISTE', async () => {
    const response = await request(server).delete('/cafes/fake_coffe').set('Authorization', 'fake_token').send()

    expect(response.status).toBe(404)
  })

  // PUNTO 3
  test('REQ3 [POST /cafes] | DEBE RETORNAR 201 AL CREAR UN NUEVO CAFE', async () => {
    const response = await request(server).post('/cafes').send(newCoffee)
    expect(response.status).toBe(201)
    expect(response.body).toContainEqual(newCoffee)
  })

  // PUNTO 4
  test('REQ4 [PUT /cafes/:id] | DEBERIA RETORNAR UN STATUS 400 SI INTENTO ACTUALIZAR UN PARAMS ID DISTINTO AL PAYLOAD ID', async () => {
    const response = await request(server).put('/cafes/fake_coffe_id').send(newCoffee)

    expect(response.status).toBe(400)
  })
})
