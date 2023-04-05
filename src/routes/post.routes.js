import express from 'express';
import { 
  getPosts, 
  getPostById, 
  addPostInventory, 
  deletePostById, 
  updatePostById,
  createCategory, 
  getCategories,
  getCategoryByName, 
  deleteCategoryById,
  updateCategoryById
} from '../controllers/post.controller.js';

const router = express.Router();

// Rutas de posts
router.get('/api/v1/posts', getPosts);
router.get('/api/v1/posts/:id', getPostById);
router.post('/api/v1/posts', addPostInventory);
router.delete('/api/v1/posts/:id_post', deletePostById);
router.put('/api/v1/posts/:id_post', updatePostById);

// Rutas de categorías
router.post('/api/v1/categorias', createCategory);
router.get('/api/v1/categorias', getCategories);
router.get('/api/v1/categorias/:nombre_de_la_categoria', getCategoryByName);
router.delete('/api/v1/categorias/:id_categoria', deleteCategoryById);
router.put('/api/v1/categorias/:id_categoria', updateCategoryById);

export default router;
