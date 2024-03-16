import { Router } from "express";
import {condb} from '../db.js';
import { getallClientes, getCliente, createCliente, updateCliente, deleteCliente } from "../controllers/clienteControllers.js";

const router = Router()

//rutas de los endpoint

router.get('/clientes', getallClientes )

router.get('/clientes/:id', getCliente)

router.post('/clientes', createCliente)

router.put('/clientes/:id', updateCliente)

router.delete('/clientes/:id', deleteCliente)

export default router