# Usar una imagen oficial de Node.js como base
FROM node:20

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivos de dependencias primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la API
COPY . .

# Exponer el puerto donde corre la API
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
