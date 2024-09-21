import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import taxisRoutes from './routes/taxisRoutes'
import trajectoriesRoutes from './routes/trajectoriesRoutes'; // Añadir las rutas de trayectorias


const prisma = new PrismaClient()

const app: Application = express();

const PORT: number = 3001;

app.listen(PORT, (): void => {
    console.log('El servidor esta abierto en el puerto:', PORT);
});

app.use(taxisRoutes);
app.use(trajectoriesRoutes);  // Usar las rutas de trayectorias
export default app;