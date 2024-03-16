import express from 'express'  //importamos express usando modulos
import proveedoresRoutes from './routes/proveedoresRoutes.js'
import clienteRoutes from './routes/clienteRouters.js'
import productoRoutes from './routes/productoRouters.js'
import ventasRoutes from './routes/ventasRouters.js'

const app = express()

app.use(express.json())  //para poder usa objetos json

// Ruta por defecto
app.get('/', (req, res) => {
    res.send('API proyecto SENA con Express y MySQL');
  });

app.use('/api', proveedoresRoutes)
app.use('/api', clienteRoutes)
app.use('/api', productoRoutes)
app.use('/api', ventasRoutes)

export default app;