import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:', (err) => { // O ruta a archivo local .db
  if (err) console.error('Error al abrir la base de datos', err.message);
  else console.log('Conectado a la base de datos SQLite.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    categoria_id INTEGER,
    FOREIGN KEY(categoria_id) REFERENCES categorias(id)
  )`);
});

export default db;