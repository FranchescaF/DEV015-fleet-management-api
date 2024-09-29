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
exports.getTrajectories = void 0;
const client_1 = __importDefault(require("../client")); //llamamos a base de datos
const getTrajectories = (_a) => __awaiter(void 0, [_a], void 0, function* ({ taxiId, date }) {
    return yield client_1.default.trajectories.findMany({
        where: {
            taxi_id: taxiId,
            //date: {
            //gte: new Date(date), // Filtra desde el inicio de la fecha
            //lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) // Hasta el final del día
            //}
        },
        select: {
            latitude: true,
            longitude: true,
        }
    });
});
exports.getTrajectories = getTrajectories;
