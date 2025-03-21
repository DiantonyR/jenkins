// routes/libroRoutes.js
import express from 'express';
import libroController from '../controllers/librocontrollers.js';
import multer from 'multer';
import path from 'path';
import { uploadPDF } from '../upload/multer.js';


const router = express.Router();



router.get("/", libroController.getAllLibros);
router.get("/:id", libroController.getLibroById);
router.post("/", libroController.addLibro);
router.put("/:id", libroController.updateById);
router.delete("/:id", libroController.deleteLibro);

export default router;