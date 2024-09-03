"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use('/', (req, res) => {
    res.send('Hola soy Fati');
});
app.listen(PORT, () => {
    console.log('El servidor esta abierto en el puerto:', PORT);
});
app.get('/taxis', (req, res) => {
    const taxis = [
        { plate: "1505", id: 1
        },
        { plate: "1505", id: 1
        },
        { plate: "1505", id: 1
        }
    ];
    res.json(taxis);
});
