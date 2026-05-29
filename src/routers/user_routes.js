import { registrarUser } from '../controllers/Porduccion_Users/register_controller.js';
import { verificarTokenJWT } from '../middlewares/JWT.js'
import { actualizarDatos, actualizarImagen, eliminarImagen } from '../controllers/Porduccion_Users/actualizar_controller.js';
import { listarUsuarios } from '../controllers/Porduccion_Users/enlistar_controller.js';

import express from 'express';

const router = express.Router();

router.post('/Produccion-jefe/registro-user',verificarTokenJWT,registrarUser);

router.put('/Produccion-jefe/actualizar-datos/:id',verificarTokenJWT,actualizarDatos);

router.put('/Produccion-jefe/actualizar-imagen/:id',verificarTokenJWT,actualizarImagen);

router.delete('/Produccion-jefe/eliminar-imagen/:id',verificarTokenJWT,eliminarImagen);

router.get('/Produccion-jefe/listar-usuarios',verificarTokenJWT,listarUsuarios);



export default router;