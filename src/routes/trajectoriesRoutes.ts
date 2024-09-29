import { Router } from "express";
import { trajectoryController } from "../controllers/trajectoriesController";

const router = Router();

// Ruta para obtener la trayectoria por taxiId y fecha
router.get('/trajectories', trajectoryController);

export default router;