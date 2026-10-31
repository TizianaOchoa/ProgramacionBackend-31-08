import { Given, When, Then } from '@cucumber/cucumber';
import request from 'supertest';
import app from '../../src/app';
import assert from 'assert';

let response: any;
let productoCreado: any;

Given('que la base de datos está disponible', function () {
  assert.ok(app, 'La aplicación Express debe estar inicializada');
});

When('envío una petición POST a {string} con el nombre {string}, precio {float} y categoria_id {int}', async function (endpoint: string, nombre: string, precio: number, categoria_id: number) {
  response = await request(app)
    .post(endpoint)
    .send({ nombre, precio, categoria_id });
});

Then('el código de respuesta debe ser {int}', function (statusCode: number) {
  assert.strictEqual(response.status, statusCode);
});

Then('el producto debe guardarse correctamente con el nombre {string}', function (nombreEsperado: string) {
  productoCreado = response.body;
  assert.strictEqual(productoCreado.nombre, nombreEsperado);
  assert.ok(productoCreado.id, 'El producto creado debe tener un ID asignado');
});