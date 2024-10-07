"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trajectoriesController_1 = require("../controllers/trajectoriesController");
const router = (0, express_1.Router)();
// Ruta para obtener la trayectoria por taxiId y fecha
router.get('/trajectories', trajectoriesController_1.trajectoryController);
router.get('/trajectories/latest', trajectoriesController_1.trajectoryController);
exports.default = router;
