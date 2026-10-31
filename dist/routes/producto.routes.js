"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_controller_1 = require("../controllers/producto.controller");
const router = (0, express_1.Router)();
router.get('/', producto_controller_1.obtenerProductos);
router.get('/:id', producto_controller_1.obtenerProductoPorId);
router.post('/', producto_controller_1.crearProducto);
router.put('/:id', producto_controller_1.actualizarProducto);
router.delete('/:id', producto_controller_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=producto.routes.js.map