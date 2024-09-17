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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaxis = void 0;
const client_1 = __importDefault(require("../client"));
const getTaxis = (_a) => __awaiter(void 0, [_a], void 0, function* ({ plate, page, limit }) {
    // Validación de los parámetros page y limit
    const pageNumber = Math.max(page, 1); // Asegura que la página sea al menos 1
    const limitNumber = Math.max(limit, 1); // Asegura que el límite sea al menos 1
    // Condición para el filtro de placa
    const findPlate = plate ? { plate: { contains: plate } } : {};
    return yield client_1.default.taxis.findMany({
        where: findPlate, // Filtrar por placa, si se proporciona
        skip: (pageNumber - 1) * limitNumber, // Saltar registros según la página
        take: limitNumber // Limitar los resultados por página
    });
});
exports.getTaxis = getTaxis;
