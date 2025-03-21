// routes/categoriaRoutes.js
import express from 'express';
import categoriaController from '../controllers/categoriaController.js';

const router = express.Router();

router.get('/', categoriaController.getAllCategorias);
router.get('/:id', categoriaController.getCategoriaById);   
router.post('/', categoriaController.addCategoria);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

export default router;