import express from 'express';
import jwt from 'jsonwebtoken';

import { renderPostInventory, renderMantenedor, agregarPost, eliminarPost, 
    eliminarCategoriaporNombre, renderPostActualizador, renderCategoriaActualizador, renderRegisterPage,
renderLoginPage } from '../controllers/views.controller.js';
import { checkAuthentication } from '../controllers/auth.controller.js';




const router = express.Router();

// Ruta para renderizar el inventario de posts
router.get('/', renderPostInventory,checkAuthentication);

// Ruta para el mantenedor
router.get('/mantenedor', renderMantenedor,checkAuthentication);
// Ruta para agregar un nuevo post
router.post('/añadir', agregarPost,checkAuthentication);

router.get('/eliminar/:id',checkAuthentication, eliminarPost)
router.get('/eliminar_categoria/:nombre_categoria', checkAuthentication, eliminarCategoriaporNombre)


// Rutas para actualizar
router.get("/actualizar/:id",checkAuthentication ,renderPostActualizador);
router.get('/actualizar_categoria/:nombre_categoria', checkAuthentication, renderCategoriaActualizador);

// ruta para renderizar register
router.get('/register', renderRegisterPage);

// ruta para renderizar la página de inicio de sesión
router.get('/login', renderLoginPage);




export default router;


