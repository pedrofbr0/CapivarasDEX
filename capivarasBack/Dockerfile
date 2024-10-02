# Usa a imagem do Node.js
FROM node:18

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do backend para o contêiner
COPY . .

# Expõe a porta 3000 para o contêiner
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]