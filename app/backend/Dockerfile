FROM node:14-alpine AS backend

WORKDIR /backend

# Arquivo compactado que será descompactado dentro do container no local especificado ('.')
# ADD node_modules.tar.gz .

COPY . .

EXPOSE 3001

CMD ["npm", "start"]