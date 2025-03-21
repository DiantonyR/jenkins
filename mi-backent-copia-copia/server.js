// index.js
import 'dotenv/config'; // Cargar variables de entorno
import app from './app.js';

const host = '0.0.0.0';
const port = process.env.port || 3000;
 // Usar el puerto de las variables de entorno o 3000 por defecto
app.listen(port,host, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});