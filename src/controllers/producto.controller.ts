import { Request, Response } from 'express';
import db from '../database/database';

export const obtenerProductos = (req: Request, res: Response) => {
  const { nombre } = req.query;
  let query = 'SELECT * FROM productos';
  const params: any[] = [];

  if (nombre) {
    query += ' WHERE nombre LIKE ?';
    params.push(`%${nombre}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(rows);
  });
};

export const obtenerProductoPorId = (req: Request, res: Response) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  db.get('SELECT * FROM productos WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Producto no encontrado' });
    return res.status(200).json(row);
  });
};

export const crearProducto = (req: Request, res: Response) => {
  const { nombre, precio, categoria_id } = req.body;

  if (!nombre || precio === undefined) {
    return res.status(422).json({ error: 'El nombre y el precio son obligatorios' });
  }

  const query = 'INSERT INTO productos (nombre, precio, categoria_id) VALUES (?, ?, ?)';
  db.run(query, [nombre, precio, categoria_id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    
    return res.status(201).json({
      id: this.lastID,
      nombre,
      precio,
      categoria_id
    });
  });
};

export const actualizarProducto = (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, precio, categoria_id } = req.body;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const query = 'UPDATE productos SET nombre = ?, precio = ?, categoria_id = ? WHERE id = ?';
  db.run(query, [nombre, precio, categoria_id, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Producto no encontrado' });

    return res.status(200).json({ id: Number(id), nombre, precio, categoria_id });
  });
};

export const eliminarProducto = (req: Request, res: Response) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  db.run('DELETE FROM productos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Producto no encontrado' });

    return res.status(204).send();
  });
};