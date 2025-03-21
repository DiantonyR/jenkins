// app.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path, { dirname } from 'path';
import morgan from 'morgan';
import libroRoutes from './routes/libroRoutes.js';
import categoriaRoutes from './routes/categoriaRouters.js';
import connection from './config/db.js';
import { fileURLToPath } from 'url';
import { uploadPDF } from './upload/multer.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(connection.connect());
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/libros', libroRoutes);
app.use('/categorias', categoriaRoutes);

export default app;