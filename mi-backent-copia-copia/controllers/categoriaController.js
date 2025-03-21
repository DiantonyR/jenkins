// controllers/categoriaController.js
import categoriaModel from '../models/categoriaModel.js';

const categoriaController = {
    getAllCategorias: async (req, res) => {
        try {
            const categorias = await categoriaModel.getAll();
            res.json(categorias);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getCategoriaById: async (req, res) => {
        const { id } = req.params;
        try {
            const categoria = await categoriaModel.getById(id);
            res.json(categoria);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    addCategoria: async (req, res) => {
        const { nombre } = req.body;
        try {
            const categoriaId = await categoriaModel.create(nombre);
            res.status(201).json({ id: categoriaId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateCategoria: async (req, res) => {
        const { id } = req.params;
        const { nombre } = req.body;
        try {
            await categoriaModel.update(id, nombre);
            res.status(201).json({ message: 'Categoría actualizada' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteCategoria: async (req, res) => {
        const { id } = req.params;
        try {
            await categoriaModel.delete(id);
            res.status(201).json({ message: 'Categoría eliminada' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

export default categoriaController;