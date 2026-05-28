import {Router} from 'express'
import { registro } from '../controllers/administrador/registro_controller.js'
import { login } from '../controllers/administrador/login_controller.js'
import { perfil } from '../controllers/administrador/perfil_controller.js'
import { actualizarPerfil } from '../controllers/administrador/ActualizarPerfil_controller.js'
import { actualizarPassword } from '../controllers/administrador/actualizarPassword_controller.js'


import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()

router.post('/registro',registro)

router.post('/administrador/login',login)

router.get('/administrador/perfil',verificarTokenJWT,perfil)

router.put('/administrador/actualizarperfil/:id',verificarTokenJWT,actualizarPerfil)

router.put('/administrador/actualizarpassword/:id',verificarTokenJWT,actualizarPassword)

export default router