import express from 'express';
import productoRoutes from './routes/producto.routes';

const app = express();

app.use(express.json());

app.use('/api/v1/productos', productoRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

export default app;