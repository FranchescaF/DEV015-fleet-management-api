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
exports.taxisControllers = void 0;
const taxisModel_1 = require("../models/taxisModel");
const taxisControllers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plate, page = 1, limit = 10 } = req.query;
        // Convertir page y limit a números
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        // Llamar a la función del modelo pasando los parámetros
        const taxis = yield (0, taxisModel_1.getTaxis)({
            plate: plate,
            page: pageNumber,
            limit: limitNumber
        });
        res.json(taxis);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los taxis.' });
    }
});
exports.taxisControllers = taxisControllers;
