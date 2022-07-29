# Docker commands

Exemplos práticos de contrução de imagens com Docker e orquestração com docker-compose Dockerfile e docker-compose.yml

## 1 Criar um container (sem iniciar) preparado para o acesso interativo

Conteiner criado a partir da imagem `alpine:3.12`

Container nomeado como `01container`

```sh
docker container create --name 01container -it alpine:3.12
```