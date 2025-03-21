// controllers/libroController.js
import libroModel from '../models/libroModel.js';
console.log(libroModel);

const libroController = {
    async getAllLibros(req, res) {
        try {
            const libros = await libroModel.getAll();
            res.json(libros);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getLibroById: async (req, res) => {
        const { id } = req.params;
        try {
            const libro = await libroModel.getById(id);
            if (!libro) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            res.json(libro);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    addLibro: async (req, res) => {
        const { titulo, publicacion, autor, categoria_id, stock, imagen, pdf} = req.body;
        try {
            const libroID = await libroModel.create(titulo, publicacion, autor, categoria_id, stock, imagen, pdf);
            res.status(201).json({ message: 'Libro creado', libroID });
        }catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateById: async (req, res) => {
        const { id } = req.params;
        const { titulo, publicacion, autor, categoria_id,stock, imagen, pdf } = req.body;
        try {
            await libroModel.update(id, titulo, publicacion, autor, categoria_id,stock, imagen, pdf);
            res.json({ message: 'Libro actualizado' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteLibro: async (req, res) => {
        const { id } = req.params;
        try {
            await libroModel.delete(id);
            res.json({ message: 'Libro eliminado' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

export default libroController;