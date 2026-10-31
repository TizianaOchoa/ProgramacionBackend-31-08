"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const assert_1 = __importDefault(require("assert"));
let response;
let productoCreado;
(0, cucumber_1.Given)('que la base de datos está disponible', function () {
    // Verificamos que la app esté lista para recibir peticiones
    assert_1.default.ok(app_1.default, 'La aplicación Express debe estar inicializada');
});
(0, cucumber_1.When)('envío una petición POST a {string} con el nombre {string}, precio {float} y categoria_id {int}', function (endpoint, nombre, precio, categoria_id) {
    return __awaiter(this, void 0, void 0, function* () {
        response = yield (0, supertest_1.default)(app_1.default)
            .post(endpoint)
            .send({ nombre, precio, categoria_id });
    });
});
(0, cucumber_1.Then)('el código de respuesta debe ser {int}ရှင်', function (statusCode) {
    assert_1.default.strictEqual(response.status, statusCode);
});
(0, cucumber_1.Then)('el producto debe guardarse correctamente con el nombre {string}', function (nombreEsperado) {
    productoCreado = response.body;
    assert_1.default.strictEqual(productoCreado.nombre, nombreEsperado);
    assert_1.default.ok(productoCreado.id, 'El producto creado debe tener un ID asignado');
});
//# sourceMappingURL=productos.steps.js.map