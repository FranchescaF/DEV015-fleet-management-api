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
        const { taxiId, date } = req.query;
        // Validaciones simples
        if (!taxiId || !date) {
            return res.status(400).json({ error: 'taxiId y date son requeridos' });
        }
        const trajectories = yield (0, trajectoriesModel_1.getTrajectories)({
            taxiId: Number(taxiId),
            date: date
        });
        res.json(trajectories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la trayectoria.' });
    }
});
exports.trajectoryController = trajectoryController;
