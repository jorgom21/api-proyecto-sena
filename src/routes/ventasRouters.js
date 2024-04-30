import { Router } from "express";
import { getallventas, getventa, createventa,updateventa, deleteventa } from "../controllers/ventasControllers.js";

const router = Router()

//rutas de los endpoint

router.get('/ventas', getallventas )

router.get('/ventas', getventa)

router.post('/ventas', createventa)

router.put('/ventas', updateventa)

router.delete('/ventas', deleteventa)

export default router