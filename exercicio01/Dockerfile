# Definir a imagem base que vamos usar pra criar a imagem personalizada - Bruno Riwerson
FROM node:14-alpine

# Definir a raiz de trabalho
WORKDIR /app

# Copiar arquivos do hospedeiro para dentro da imagem
COPY . .

# Define a porta da nossa aplicação que desejamos expor
EXPOSE 3000

# Define o comando padrão que será executado no container (start do container)
CMD ["node", "index.js"]

# Para construir a imagem com a tag (nome) "nodeserver":
# docker build -t nodeserver .

# Para rodar use:
# docker run -d --name nodeServer -p 3000:3000 nodeserver