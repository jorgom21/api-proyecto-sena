import { Router } from 'express';
import {condb} from '../db.js';
import { getallproductos, getproducto, createproducto, updateproducto, deleteproducto } from "../controllers/productoControllers.js";

const router = Router()

//rutas de los endpoint

router.get('/productos', getallproductos )

router.get('/productos/:id', getproducto)

router.post('/productos', createproducto)

router.put('/productos/:id', updateproducto)

router.delete('/productos/:id', deleteproducto)

export default router