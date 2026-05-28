import express from 'express';
import recuperarPasswordUniversal from '../controllers/forgot/resetPassword.js';
import comprobarTokenPasswordUniversal from '../controllers/forgot/ComprobarPassword.js';
import nuevoPasswordUniversal from '../controllers/forgot/nuevoPasswordUniversal.js';

const router = express.Router();

router.post('/recuperar-password', recuperarPasswordUniversal);

router.get('/recuperarpasswordUniversal/:token',comprobarTokenPasswordUniversal)

router.post('/nuevopasswordUniversal/:token',nuevoPasswordUniversal)

export default router;