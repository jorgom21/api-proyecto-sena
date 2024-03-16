import { Router } from "express";
import {condb} from '../db.js';
import { getallproveedores, getproveedor, createproveedor, updateproveedor,deleteproveedor } from "../controllers/proveedoresControllers.js";

const router = Router()

//rutas de los endpoint

router.get('/proveedores', getallproveedores )

router.get('/proveedores/:id', getproveedor)

router.post('/proveedores', createproveedor)

router.put('/proveedores/:id', updateproveedor)

router.delete('/proveedores/:id', deleteproveedor)

export default router