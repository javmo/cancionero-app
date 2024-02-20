# Usar la imagen base de Node.js
FROM node:14-alpine as build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json e instalar las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar la aplicación React
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos de compilación de la aplicación React a NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar NGINX en el primer plano
CMD ["nginx", "-g", "daemon off;"]
