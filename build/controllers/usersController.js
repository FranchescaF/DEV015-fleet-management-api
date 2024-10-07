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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const client_1 = __importDefault(require("../client"));
// Crear un nuevo usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield client_1.default.users.create({
            data: { name, email, password },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creando el usuario' });
    }
});
exports.createUser = createUser;
// Leer todos los usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hola');
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const users = yield client_1.default.users.findMany({
            skip: skip,
            take: limit,
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error obteniendo los usuarios' });
    }
});
exports.getUsers = getUsers;
// Leer un usuario por ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield client_1.default.users.findUnique({ where: { id: Number(id) } });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error obteniendo el usuario' });
    }
});
exports.getUserById = getUserById;
// Actualizar un usuario
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = yield client_1.default.users.update({
            where: { id: Number(id) },
            data: { name, email, password },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error actualizando el usuario' });
    }
});
exports.updateUser = updateUser;
// Eliminar un usuario
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield client_1.default.users.delete({ where: { id: Number(id) } });
        res.status(200).json({ message: 'Usuario eliminado' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error eliminando el usuario' });
    }
});
exports.deleteUser = deleteUser;
