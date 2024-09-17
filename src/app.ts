import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import taxisRoutes from './routes/taxisRoutes'


const prisma = new PrismaClient()

const app: Application = express();

const PORT: number = 3001;

app.listen(PORT, (): void => {
    console.log('El servidor esta abierto en el puerto:', PORT);
});

app.use(taxisRoutes);
export default app;