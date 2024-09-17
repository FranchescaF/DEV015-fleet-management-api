import { taxisControllers } from "../controllers/taxisControllers";
import { Router } from "express";

const router = Router();
router.get('/taxis', taxisControllers);

export default router;