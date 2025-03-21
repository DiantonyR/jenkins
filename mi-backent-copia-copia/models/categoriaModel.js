// models/categoriaModel.js
import db from '../config/db.js';

class categoriaModel {
    static async getAll() {
        let connection
        try {
            connection = await db.connect();
            const [polloAlegre] = await connection.query('SELECT * FROM categorias');
            return polloAlegre;
        } catch (error) {
            throw new Error(`Error al obtener las categorias: ${error.message}`);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    static async getById(id) {
        try {
            const connection = await db.connect();
            const [rows] = await connection.query('SELECT * FROM categorias WHERE id = ?', [id])
            connection.release();
            if (rows.length === 0) {
                throw new Error('Categoria no encontrada');
            }
            return rows[0];
        } catch (error) {
            throw new Error(`Error al obtener la categoria: ${error.message}`);
        }
    }

    static async create(nombre) {
        let connection;
        try {
            connection = await db.connect();
            const [create] = await connection.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
            return create.insertId;
        } catch (error) {
            throw new Error(`Error al agregar la categoria: ${error.message}`);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    static async update(id, nombre) {
        let connection;
        try {
            connection = await db.connect();
            const [update] = await connection.query('UPDATE categorias SET nombre = ? WHERE id = ?',
                [nombre, id]
            );
            if (update.affectedRows === 0) {
                throw new Error(`No se encontró una categoria con el ID: ${id}`);
            }
            return { succes: true, message: `categoria actualizada con ID ${id}` };
        } catch (error) {
            throw new Error(`Error al actualizar la categoria: ${error.message}`);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    static async delete(id) {
        let connection;
        try {
            connection = await db.connect();
            const [deleted] = await connection.query('DELETE FROM categorias WHERE id = ?', [id]);
            if (deleted.affectedRows === 0) {
                throw new Error(`No se encontró una categoria con el ID: ${id}`);
            }
            return { succes: true, message: `categoria eliminada con ID ${id}` };
        } catch (error) {
            throw new Error(`Error al eliminar la categoria: ${error.message}`);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
};

export default categoriaModel;