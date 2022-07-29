# Docker commands

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