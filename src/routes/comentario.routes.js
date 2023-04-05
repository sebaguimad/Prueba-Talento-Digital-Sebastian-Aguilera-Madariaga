import express from 'express';
import {
  getAllComentarios,
  createComentario,
  updateComentario,
  deleteComentario,
} from '../controllers/comentarioController.js';

const router = express.Router();

// GET /api/v1/comentarios
router.get('/api/v1/comentarios', getAllComentarios);

// POST /api/v1/comentarios
router.post('/api/v1/comentarios', createComentario);

// PUT /api/v1/comentarios/:id_comentario
router.put('/api/v1/comentarios/:id_comentario', updateComentario);

// DELETE /api/v1/comentarios/:id_comentario
router.delete('/api/v1/comentarios/:id_comentario', deleteComentario);

export default router;
