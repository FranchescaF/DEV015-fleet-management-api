"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taxisControllers_1 = require("../controllers/taxisControllers");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/taxis', taxisControllers_1.taxisControllers);
exports.default = router;
