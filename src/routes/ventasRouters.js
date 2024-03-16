import { Router } from "express";
import {condb} from '../db.js';
import { getallventas, getventa, createventa,updateventa, deleteventa } from "../controllers/ventasControllers.js";

const router = Router()

//rutas de los endpoint

router.get('/ventas', getallventas )

router.get('/ventas/:id', getventa)

router.post('/ventas', createventa)

router.put('/ventas/:id', updateventa)

router.delete('/ventas/:id', deleteventa)

export default router