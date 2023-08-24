# Notifications App - v1.0.0

## Descrição

Com base no documento localizado em /.docs, criar uma aplicação onde seja possível listar, adicionar, atualizar e
remover (CRUD) dados referente a notificações em um sistema web, além de facilitar a republicação inativação/ativação de uma notificação.
A aplicação foi desenvolvida utilizando VueJs em seu frontend e PHP Laravel como um serviço de backend

## Funcionalidades implementadas

### Backend
- Busca de notificações com paginação e opção para filtrar através dos campos 'titulo' e 'descrição'
- Adição e Atualização de notificações
- Deleção de notificações

### Frontend (em desenvolvimento)

## Pré-requisitos

Para execução da aplicação é necessário ter instalado no ambiente os softwares **Docker v4**, pois o projeto foi
estruturado para funcionar através da utilização de containers

## Instalação, Build, Execução e Utilização

### Git Clone

Faça a cópia do projeto para seu ambiente

``` bash
    git clone https://github.com/brunogodoif/reciclare-notifications.git
```

Acessar a raiz do projeto

#### Build

``` bash
     docker-compose -f docker-compose/docker-compose.yml build
```

#### Execução

``` bash
     docker-compose -f docker-compose/docker-compose.yml up
```

#### Utilização

Em seu navegador web, acessar o endereço **http://localhost:7074** irá acessar a aplicação frontend

Caso queria utilizar o serviço backend diretamente, foi implementado uma aplicação swagger dentro do projeto onde é possível interagir através do endereço **http://localhost:7075/api/documentation**