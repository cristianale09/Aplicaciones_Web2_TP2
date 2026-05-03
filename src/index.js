import express from 'express';
import usersRoutes from './routes/users.routes.js';
import productsRoutes from './routes/productos.routes.js';
import salesRoutes from './routes/ventas.routes.js';


const app = express();

const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*RUTAS DE USUARIOS*/
app.use('/users', usersRoutes);

/*RUTAS DE PRODUCTOS*/
app.use('/productos', productsRoutes);

/*RUTAS DE VENTAS*/
app.use('/ventas', salesRoutes);