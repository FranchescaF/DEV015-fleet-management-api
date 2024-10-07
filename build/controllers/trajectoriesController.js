"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trajectoryController = void 0;
const trajectoriesModel_1 = require("../models/trajectoriesModel");
const trajectoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiId = req.query.taxiId;
        const date = req.query.date;
        // Si no se proporcionan taxiId y date, obtener las trayectorias más recientes
        if (!taxiId && !date) {
            const latestTrajectories = yield (0, trajectoriesModel_1.getLatestTrajectories)();
            // Si no hay resultados, devolver 404
            if (!latestTrajectories || latestTrajectories.length === 0) {
                return res.status(404).json({ error: "No se encontraron trayectorias" });
            }
            // Devolver los datos más recientes de cada taxi
            return res.status(200).json(latestTrajectories);
        }
        const dateStr = date ? req.query.date : '';
        const dateReversed = dateStr ? dateStr.split('-').reverse().join('-') : '';
        const isValidDateFormat = (dat) => {
            return /^\d{4}-\d{2}-\d{2}$/.test(dat);
        };
        if (dateReversed && !isValidDateFormat(dateReversed)) {
            return res.status(400).json({ error: "date badly formatted >-<" });
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
        const trajectories = yield (0, trajectoriesModel_1.getTrajectories)(numericTaxiId, date);
        // Si no se encuentran trayectorias, devolver 404
        if (trajectories.length === 0) {
            return res.status(404).json({ error: 'No se encontraron trayectorias para el taxiId especificado' });
        }
        res.json(trajectories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la trayectoria.' });
    }
});
exports.trajectoryController = trajectoryController;
