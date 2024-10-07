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
exports.getLatestTrajectories = exports.getTrajectories = void 0;
const client_1 = __importDefault(require("../client")); //llamamos a base de datos
const getTrajectories = (taxiId, date) => __awaiter(void 0, void 0, void 0, function* () {
    // Convertimos la fecha de entrada a UTC estableciendo 00:00:00 del día especificado
    const startDate = new Date(Date.UTC(new Date(date).getUTCFullYear(), new Date(date).getUTCMonth(), new Date(date).getUTCDate(), 0, 0, 0, 0));
    // Creamos la fecha de fin sumando un día completo y restando un milisegundo
    const endDate = new Date(Date.UTC(new Date(date).getUTCFullYear(), new Date(date).getUTCMonth(), new Date(date).getUTCDate() + 1, 0, 0, 0, -1));
    console.log(endDate);
    const trajectories = yield client_1.default.trajectories.findMany({
        where: {
            taxi_id: taxiId, // Conversión de taxiId a entero
            date: {
                gte: startDate, // Fecha y hora de inicio
                lte: endDate // Fecha y hora de fin
            }
        },
        select: {
            id: true,
            taxi_id: true,
            date: true,
            latitude: true,
            longitude: true,
        }
    });
    // Transforma los resultados para ajustarse al formato requerido
    return trajectories.map(trajectory => ({
        id: trajectory.id,
        taxiId: trajectory.taxi_id,
        date: trajectory.date.toISOString(),
        latitude: trajectory.latitude,
        longitude: trajectory.longitude
    }));
});
exports.getTrajectories = getTrajectories;
// Función que obtiene la información más reciente de cada taxi
const getLatestTrajectories = () => __awaiter(void 0, void 0, void 0, function* () {
    const latestTrajectories = yield client_1.default.trajectories.findMany({
        orderBy: {
            date: 'desc', // Ordenar por fecha descendente para obtener las trayectorias más recientes
        },
        distinct: ['taxi_id'], // Evitar duplicados, obteniendo un registro por taxi
        include: {
            taxis: {
                select: {
                    plate: true, // Seleccionar solo la placa del taxi
                }
            }
        }
    });
    // Transforma los resultados para asegurarte de que se devuelvan en el formato adecuado
    return latestTrajectories.map(trajectory => ({
        taxiId: trajectory.taxi_id, // taxiId del taxi
        plate: trajectory.taxis.plate, // Placa obtenida del modelo relacionado taxis
        latitude: trajectory.latitude, // Latitud de la trayectoria
        longitude: trajectory.longitude, // Longitud de la trayectoria
        timestamp: trajectory.date.toISOString() // Formatear la fecha a string ISO
    }));
});
exports.getLatestTrajectories = getLatestTrajectories;
//Filtrado de fechas:
//gte (greater than or equal): asegura que se incluyan trayectorias desde el inicio del día.
//lte (less than or equal): asegura que se incluyan trayectorias hasta el final del día.
