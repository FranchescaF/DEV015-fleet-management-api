import { getTaxis } from "../models/taxisModel";
import { Request,Response } from "express";

export const taxisControllers= async (req: Request, res: Response) => {
    try {
        const { plate, page = 1, limit = 10 } = req.query;
        
        // Convertir page y limit a números
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        // Llamar a la función del modelo pasando los parámetros
        const taxis = await getTaxis({
            plate: plate as string,
            page: pageNumber,
            limit: limitNumber
        });

        res.json(taxis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los taxis.' });
    }
}