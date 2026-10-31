"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProducto = exports.actualizarProducto = exports.crearProducto = exports.obtenerProductoPorId = exports.obtenerProductos = void 0;
const database_1 = __importDefault(require("../database/database"));
const obtenerProductos = (req, res) => {
    const { nombre } = req.query;
    let query = 'SELECT * FROM productos';
    const params = [];
    if (nombre) {
        query += ' WHERE nombre LIKE ?';
        params.push(`%${nombre}%`);
    }
    database_1.default.all(query, params, (err, rows) => {
        if (err)
            return res.status(500).json({ error: err.message });
        return res.status(200).json(rows);
    });
};
exports.obtenerProductos = obtenerProductos;
const obtenerProductoPorId = (req, res) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    database_1.default.get('SELECT * FROM productos WHERE id = ?', [id], (err, row) => {
        if (err)
            return res.status(500).json({ error: err.message });
        if (!row)
            return res.status(404).json({ error: 'Producto no encontrado' });
        return res.status(200).json(row);
    });
};
exports.obtenerProductoPorId = obtenerProductoPorId;
const crearProducto = (req, res) => {
    const { nombre, precio, categoria_id } = req.body;
    if (!nombre || precio === undefined) {
        return res.status(422).json({ error: 'El nombre y el precio son obligatorios' });
    }
    const query = 'INSERT INTO productos (nombre, precio, categoria_id) VALUES (?, ?, ?)';
    database_1.default.run(query, [nombre, precio, categoria_id], function (err) {
        if (err)
            return res.status(500).json({ error: err.message });
        return res.status(201).json({
            id: this.lastID,
            nombre,
            precio,
            categoria_id
        });
    });
};
exports.crearProducto = crearProducto;
const actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, categoria_id } = req.body;
    if (isNaN(Number(id))) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    const query = 'UPDATE productos SET nombre = ?, precio = ?, categoria_id = ? WHERE id = ?';
    database_1.default.run(query, [nombre, precio, categoria_id, id], function (err) {
        if (err)
            return res.status(500).json({ error: err.message });
        if (this.changes === 0)
            return res.status(404).json({ error: 'Producto no encontrado' });
        return res.status(200).json({ id: Number(id), nombre, precio, categoria_id });
    });
};
exports.actualizarProducto = actualizarProducto;
const eliminarProducto = (req, res) => {
    const { id } = req.params;
    if (isNaN(Number(id))) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    database_1.default.run('DELETE FROM productos WHERE id = ?', [id], function (err) {
        if (err)
            return res.status(500).json({ error: err.message });
        if (this.changes === 0)
            return res.status(404).json({ error: 'Producto no encontrado' });
        return res.status(204).send();
    });
};
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=producto.controller.js.map