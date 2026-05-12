## Comando para baixar a intalar o node
## Alpine é uma versão simplificada e leve 
FROM node:alpine

## Define o local o app (api) ficará no disco do container
WORKDIR /usr/app

## Copia os arquivos de configuração do node para o container (tudo que começa com package e termina com .json para dentro da pasta /usr/app)
COPY package*.json ./

## Executa npm install para adicionar todas as dependências do node (node_modules) 
RUN npm install

## Copiar tudo que está no diretório a onde o Dockerfile está 
##para dentro do container (pasta /usr/app)
COPY . .

## Expõe a porta 5000 para o container
EXPOSE 5000

## Executa o comando npm start para iniciar o script de start do node (que inicia o servidor)ue está no package.json
CMD ["npm", "start"]