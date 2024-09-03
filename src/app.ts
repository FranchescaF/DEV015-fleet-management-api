import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app: Application = express();

const PORT: number = 3001;

/*app.use('/', (req: Request, res: Response): void => {
    res.send('Hola soy Fati');
});*/

app.listen(PORT, (): void => {
    console.log('El servidor esta abierto en el puerto:', PORT);
});

app.get('/taxis', async (req: Request, res: Response) => {
    const taxis = await prisma.taxis.findMany({
        where: {plate: {contains: 'J'}}
      })
    res.json(taxis)
});