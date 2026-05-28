import express from 'express';
import { registrarJefe } from '../controllers/Produccion/registro_controller.js'
import { loginJefe } from '../controllers/Produccion/login_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'
import { perfilJefe } from '../controllers/Produccion/perfil_controller.js'
import { actualizarPerfilJefe, actualizarImagen, eliminarImagen } from '../controllers/Produccion/actualizarPerfil_controller.js'


const router = express.Router();

router.post('/Produccion-jefe/registro',verificarTokenJWT,registrarJefe);

router.put('/Produccion-jefe/actualizar-perfil/:id',verificarTokenJWT,actualizarPerfilJefe);

router.post('/Produccion-jefe/login',loginJefe);

router.get('/Produccion-jefe/perfil',verificarTokenJWT,perfilJefe);

router.put('/Produccion-jefe/actualizar-imagen/:id',verificarTokenJWT,actualizarImagen);

router.delete('/Produccion-jefe/eliminar-imagen/:id',verificarTokenJWT,eliminarImagen);



export default router;
