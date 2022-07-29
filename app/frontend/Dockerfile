FROM node:14-alpine AS frontend

WORKDIR /frontend

# Arquivo compactado que será descompactado dentro do container no local especificado ('.')
# ADD node_modules.tar.gz .

COPY . .

EXPOSE 3000

CMD ["npm", "start"]