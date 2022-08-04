# Docker

`docker engine` = aplicação que roda containers a partir de imagens (como o tocador de cd)

`docker image` = arquivo que contém os dados necessários para um container rodar (como um cd de música)

`docker container` = uma aplicação em caixa-de-areia baseada em uma imagem (como a música tocando)

`docker volume` = uma pasta compartilhada entre o hospedeiro e o container

Exemplos práticos de contrução de imagens com Docker e orquestração com docker-compose Dockerfile e docker-compose.yml

## 0 Comandos úteis durante o desenvolvimento

### Para descobrir quais containers estão rodando execute

```sh
docker ps -a
```

### Para parar todos os containers execute

```sh
docker stop $(docker ps -aq)
```

### Para conectar a um container que está rodando

```sh
docker container attach nome_do_container
```

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

Um projeto com vários containers representando cada parte da aplicação (ex: frontend, backend e banco de dados) pode ser iniciada facilmente à partir de um arquivo apenas. Pra isso usamos docker-compose.

## 11 Subir uma orquestração de uma aplicação completa (banco de dados, backend e frontend)

Para subir a orquestração se utiliza 

`docker-compose up`

Para descer a orquestração e remover containers se utiliza

`docker-compose down --remove-orphans`


```yml
# ./app/docker-compose.yml
```

# Outras dicas

## 12 Subir um continer com imagem SQL em segundo plano e expor a porta padrão


- A senha do usuário root é `12345678`

```sh
docker run -p 3306:3306 --name mysql_80 -e MYSQL_ROOT_PASSWORD=12345678 -d mysql:8 mysqld --default-authentication-plugin=mysql_native_password
```

Para verificar se está acessível pelo host acesse: localhost:3306 a seguinte mensagem deve aparecer no navegador:

```html
 J���
8.0.30����P(S88h5�ےےے�ےك����������j; X#~H�mysql_native_password�!��ے„#08S01Got packets out of order
```