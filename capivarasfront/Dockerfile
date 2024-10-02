# Usa a imagem do Node.js
FROM node:18

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do frontend para o contêiner
COPY . .

# Gera o build da aplicação frontend
RUN npm run build

# Instala o servidor estático serve
RUN npm install -g serve

# Expõe a porta 8080 para o contêiner
EXPOSE 8080

# Comando para servir a aplicação frontend
CMD ["serve", "-s", "dist"]