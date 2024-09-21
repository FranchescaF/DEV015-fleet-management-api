import { Request, Response } from "express";
import { getTrajectories } from "../models/trajectoriesModel";

export const trajectoryController = async (req: Request, res: Response) => {
    try {
        const { taxiId, date } = req.query;

        // Validaciones simples
        if (!taxiId || !date) {
            return res.status(400).json({ error: 'Se requiere taxiId y date en el formato correcto.' });
        }

        const trajectories = await getTrajectories({
            taxiId: Number(taxiId),
            date: date as string
        });

        res.json(trajectories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la trayectoria.' });
    }
}
