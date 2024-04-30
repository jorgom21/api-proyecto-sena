import { Router } from "express";
import { getallproveedores, getproveedor, createproveedor, updateproveedor,deleteproveedor } from "../controllers/proveedoresControllers.js";

const router = Router()

//rutas de los endpoint

router.get('/proveedores', getallproveedores )

router.get('/proveedores', getproveedor)

router.post('/proveedores', createproveedor)

router.put('/proveedores', updateproveedor)

router.delete('/proveedores', deleteproveedor)

export default router