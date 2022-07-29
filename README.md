# Docker

Exemplos práticos de contrução de imagens com Docker e orquestração com docker-compose Dockerfile e docker-compose.yml

## 1 Criar um container (sem iniciar) preparado para o acesso interativo

Conteiner criado a partir da imagem `alpine:3.12`

Container nomeado como `01container`

```sh
docker container create --name 01container -it alpine:3.12
```

## 2 Iniciar um container previamente criado

```sh
docker container start 01container
```

## 3 Listar containers filtrando pelo nome

```sh
docker container ls -af name=01container
```

## 4 Executar comandos no container sem se acoplar a ele

Nesse exemplo foi executado `cat /etc/os-release` que mostra a versão da distribuição da imagem

```sh
docker container exec 01container cat /etc/os-release
```

## 5 Remover um container que está rodando de maneira forçada

```sh
docker container rm -f 01container
```

## 6 Baixar uma imagem para usar em outro momento

```sh
docker pull nginx:1.21.3-alpine
```

## 7 Rodar um container em segundo plano expondo uma porta de acesso

A porta interna 80 foi exposta para o hospedeiro pela porta 3000. Acessando a porta 3000 do hospedeiro
conectamos com o container.

```sh
docker container run --name 02images -itd -p 3000:80 nginx:1.21.3-alpine
```

## 8 Parar um container

```sh
docker container stop 02images
```

# Docker - criar imagens com Dockerfile

## 9 Criar uma imagem para o backend do projeto com o nome de `backend`

O comando `FROM` define a imagem base a ser usada na contrução dessa imagem.

  - Imagens Alpine são compactas e carregam apenas o necessário.
  - Uma outra opção menor ainda seria a imagem

O comando `ADD` pode ser usado para descompactar um arquivo previamente criado para dentro da imagem

O comando `COPY` copia os arquivos da origem (host) para o destino (imagem)

O comando `EXPOSE` define que a porta exposta será a `3001`

O comando `CMD` define o comando que será usado iniciar o container.
  
  **Apenas a última instrução `CMD` será executado caso mais de um `CMD` esteja neste arquivo.**

```dockerfile
# app/backend/Dockerfile
FROM node:14-alpine AS backend

WORKDIR /backend

# Arquivo compactado que será descompactado dentro do container no local especificado ('.')
# ADD node_modules.tar.gz .

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

## 10 Construir uma imagem para o frontend do projeto com o nome de `frontend`

```dockerfile
# app/frontend/Dockerfile
FROM node:14-alpine AS frontend

WORKDIR /frontend

# Arquivo compactado que será descompactado dentro do container no local especificado ('.')
# ADD node_modules.tar.gz .

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

# Orquestração - docker-compose