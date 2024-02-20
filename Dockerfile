# Utiliza una imagen base oficial de Node.js (Alpine)
FROM node:14-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente al directorio de trabajo
COPY . .

# Expone el puerto 3000 para que la aplicación sea accesible
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "start"]