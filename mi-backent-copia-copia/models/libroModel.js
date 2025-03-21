// models/libroModel.js
import db from '../config/db.js';

class libroModel  {
    static async getAll() {
        let connection
        try {
            connection = await db.connect();
            const [polloCampesino] = await connection.query('SELECT * FROM libros');
            connection.release();
            return polloCampesino;
        }catch (error) {
            throw new Error(`Error al obtener los libros: ${error.message}`);
        }
    }

    static async getById(id) {
        try {
            const connection = await db.connect();
            const [rows] = await connection.query('SELECT * FROM libros WHERE id = ?',[id])
            connection.release();
            if (rows.length === 0) {
                throw new Error('Libro no encontrado');
            }
            return rows[0];
        }catch (error) {
            throw new Error(`Error al obtener el libro: ${error.message}`);
        }
    }

    static async create(titulo, publicacion, autor, categoria_id, stock, imagen, pdf) {   
        try {
            const connection = await db.connect();
            const [result] = await connection.query('INSERT INTO libros (titulo, publicacion, autor, categoria_id, stock, imagen, pdf) VALUES (?, ?, ?, ?, ?, ?, ?)', [titulo, publicacion, autor, categoria_id, stock, imagen, pdf]);
            connection.release();
            console.log(`Se ha creado un nuevo libro con el id ${result.insertId}`);
            return result;
        }catch (error) {
            throw new Error(`Error al agregar el libro: ${error.message}`);
        }   

    }

    static async update(id, titulo, publicacion, autor, categoria_id, imagen, pdf) {
        let connection;
        try {
            connection = await db.connect();
            
            const [result] = await connection.query(
                'UPDATE libros SET titulo = ?, publicacion = ?, autor = ?, categoria_id = ?, imagen = ?, pdf = ? WHERE id = ?', 
                [titulo, publicacion, autor, categoria_id, imagen, pdf, id]
            );
    
            if (result.affectedRows === 0) {
                throw new Error(`No se encontró un libro con el ID: ${id}`);
            }
    
            return { success: true, message: `Libro actualizado con ID ${id}` };
        } catch (error) {
            throw new Error(`Error al actualizar el libro: ${error.message}`);
        } finally {
            if (connection) connection.release();  // Liberar la conexión siempre
        }
    }


    static async delete(id) {
        let connection;
        try {
            connection = await db.connect();
            const [result] = await connection.query('DELETE FROM libros WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error(`no se encontro un libro con el ID: ${id}`);
            }
            return { success: true, message: `Libro eliminado con ID ${id}` };
        }catch (error) {
            throw new Error(`Error al eliminar el libro: ${error.message}`); 
        }finally {
            if (connection) connection.release();   
        }
    }
    
        


};
export default libroModel;