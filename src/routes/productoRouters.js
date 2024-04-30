import { Router } from 'express';
import {condb} from '../db.js';
import { getallproductos, getproducto, createproducto, updateproducto, deleteproducto } from "../controllers/productoControllers.js";

const router = Router()

//rutas de los endpoint

router.get('/productos', getallproductos )

router.get('/productos', getproducto)

router.post('/productos', createproducto)

router.put('/productos', updateproducto)

router.delete('/productos', deleteproducto)

export default router