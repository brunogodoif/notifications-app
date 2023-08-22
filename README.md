# Notifications App - v1.0.0

## Descrição

Com base no documento localizado em /.docs, criar uma aplicação onde seja possivel listar, adicionar, atualizar e
remover (CRUD) dados referente a notificações em um sistema web.
A aplicação foi desenvolvida utilizando VueJs em seu frontend e PHP Laravel como um serviço de backend

## Funcionalidades implementadas

- Busca de notificações com paginação e opção para filtrar através dos campos ´titulo´ e descrição
- Adição e Atualização de notificações
- Deleção de notificações
- Autenticação via token baseado em login e senha

## Pré-requisitos

Para execução da aplicação é necessário ter instalado no ambiente os software **Docker v4**, pois o projeto foi
estruturado para funcionar atraves da utilização de containers

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

Em seu navegador web, acessar o endereço **http://localhost/7074** e inserir as credenciais de acesso **(user)** tanto
para login e senha