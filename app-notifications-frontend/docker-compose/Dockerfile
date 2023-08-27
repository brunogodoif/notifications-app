FROM node:16 AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build da aplicação Vue.js
RUN npm run build-dev

# Use a imagem oficial do Nginx como base para a imagem final
FROM nginx:latest

# Remova a configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copie o arquivo de configuração personalizado para o Nginx
COPY ./docker-compose/conf/nginx/nginx.conf /etc/nginx/conf.d/

COPY ./docker-compose/conf/entrypoint.sh /usr/local/bin/start.sh

# Copie os arquivos otimizados do projeto Vue.js do build-stage para a pasta do servidor Nginx
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/

# Exponha a porta do Nginx (padrão é 80)
EXPOSE 80

ENTRYPOINT ["sh", "/usr/local/bin/start.sh"]
