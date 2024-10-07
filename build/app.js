"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const taxisRoutes_1 = __importDefault(require("./routes/taxisRoutes"));
const trajectoriesRoutes_1 = __importDefault(require("./routes/trajectoriesRoutes")); // Añadir las rutas de trayectorias
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = 3001;
app.listen(PORT, () => {
    console.log('El servidor esta abierto en el puerto:', PORT);
});
app.use(taxisRoutes_1.default);
app.use(trajectoriesRoutes_1.default); // Usar las rutas de trayectorias
app.use(usersRoutes_1.default);
exports.default = app;
