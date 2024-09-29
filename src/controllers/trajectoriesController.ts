import { Request, Response } from "express";
import { getTrajectories, getLatestTrajectories} from "../models/trajectoriesModel";

export const trajectoryController = async (req: Request, res: Response) => {
    try {
        const taxiId = req.query.taxiId as string | undefined;
        const date = req.query.date as string | undefined;

        // Si no se proporcionan taxiId y date, obtener las trayectorias más recientes
        if (!taxiId && !date) {
            const latestTrajectories = await getLatestTrajectories();

            // Si no hay resultados, devolver 404
            if (!latestTrajectories || latestTrajectories.length === 0) {
                return res.status(404).json({ error: "No se encontraron trayectorias" });
            }

            // Devolver los datos más recientes de cada taxi
            return res.status(200).json(latestTrajectories);
        }

        const dateStr = date ? req.query.date as string : '';
        const dateReversed = dateStr ? dateStr.split('-').reverse().join('-') : '';
        const isValidDateFormat = (dat: string) => {
            return /^\d{4}-\d{2}-\d{2}$/.test(dat);
        };
        if(dateReversed && !isValidDateFormat(dateReversed)){
            return res.status(400).json({error: "date badly formatted >-<"})
        }
         // Validación si se proporcionan taxiId y date
        if (!taxiId || !date) {
            return res.status(400).json({ error: 'taxiId y date son requeridos' });
        }

        // Convertir taxiId a número
        const numericTaxiId = Number(taxiId);
        if (isNaN(numericTaxiId)) {
            return res.status(400).json({ error: 'taxiId debe ser un número válido' });
        }
        // Obtener las trayectorias
        const trajectories = await getTrajectories(numericTaxiId,date)
         // Si no se encuentran trayectorias, devolver 404
         if (trajectories.length === 0) {
            return res.status(404).json({ error: 'No se encontraron trayectorias para el taxiId especificado' });
        }

        res.json(trajectories);   
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la trayectoria.' });
    }
}