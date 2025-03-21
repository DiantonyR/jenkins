import mysql2 from 'mysql2/promise'

class connection {
    constructor() {
        this.pool = null
    }

    async connect() {
        if (!this.pool) {
            this.pool = mysql2.createPool({
                host: process.env.DB_HOST || 'mysql',
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT || 3306,
                waitForConnections: true,
                connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
                queueLimit: 0,
            })
        };
        let retries = 5;
        while (retries > 0) {
            try {
                const connection = await this.pool.getConnection();
                console.log('Conectado a la base de datos');
                return connection;
            } catch (error) {
                retries--;
                console.log(`Error al conectar a MySQL. Reintentando en 5s... (${retries} intentos restantes)`);
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
        }
        throw new Error('🚨 No se pudo conectar a MySQL después de varios intentos');

    }





    getPool() {
        if (!this.pool) {
            throw new Error(`connecion no establecida ${this.pool}`);
        }
        return this.pool;
    }

    async close() {
        if (this.pool) {
            await this.pool.end();
            this.pool = null;
            console.log('conexion cerrada');
        }
    }
}

export default new connection();