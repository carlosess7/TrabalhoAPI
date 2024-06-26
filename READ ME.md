Modelo de dados do cliente:
id (Primary Key)
código (Unique Key)
nome


Modelo de dados do endereço:
id (Primary Key)
clienteId (Foreign Key)
índice
logradouro
número
complemento
cidade
estado
cep

___________________________________________________________

# API de Gerenciamento de Clientes e Endereços

Esta é uma API construída em Node.js usando o framework Express para gerenciar clientes e seus endereços.

## Pré-requisitos
- Node.js e npm instalados na máquina.

1. Instale as dependências do projeto:
npm install
npm install express
npm install jsonwebtoken

2. Execute o servidor:
node clientService.js

## Uso
A API fornece endpoints para gerenciar clientes e seus endereços. Abaixo estão os endpoints disponíveis:

- **POST /api/v1/cliente**: Criar um novo cliente.
- **GET /api/v1/cliente/{codigo}**: Obter um cliente específico pelo código.
- **GET /api/v1/cliente**: Obter todos os clientes.
- **POST /api/v1/cliente/{codigo}/endereco**: Adicionar um endereço a um cliente específico.
- **GET /api/v1/cliente/{codigo}/endereco**: Obter o endereço de um cliente específico.
- **PUT /api/v1/v1/cliente/{codigo}/endereco/estado**: Alterar o estado do endereço de um cliente específico pelo código do cliente.

____________________________________________________________________________________________________________________________________
3. Criar Serviços no Kong:
Na colection Disponibilizada no Postman (API Node.js com Kong >> services/Routes >> Criar Serviço)
-**POST http://localhost:8001/services**
1. Body:
{
  "name": "Login",
  "url": "http://192.168.0.14:3000/api/v1/login",
  "enabled": true
}

2. Body:
{
  "name": "GetClientsByCode",
  "url": "http://192.168.0.14:3000/api/v1/cliente/:codigo",
  "enabled": true
}

3. Body:
{
  "name": "PostClient",
  "url": "http://192.168.0.14:3000/api/v1/cliente",
  "enabled": true
}

4. Body:
{
  "name": "transformationPayload",
  "url": "http://192.168.0.14:3000/api/v1/cliente/:codigo/endereco/estado",
  "enabled": true
}

5. Body:
{
  "name": "GetAllClients",
  "url": "http://192.168.0.14:3000/api/v1/cliente",
  "enabled": true
}
6. Body:
{
  "name": "GetAdressToClientByCode",
  "url": "http://192.168.0.14:3000/api/v1/cliente/:codigo/endereco",
  "enabled": true
}

7. Body:
{
  "name": "PostAdressToClientByCode",
  "url": "http://192.168.0.14:3000/api/v1/cliente/:codigo/endereco",
  "enabled": true
}
__________________________________________________________________________________________________

4. Criar as Rotas para os serviços no Kong:
Na colection Disponibilizada no Postman (API Node.js com Kong >> services/Routes >> Criar Rotas)
-**POST http://localhost:8001/routes**
1. Body:
{
  "tags": [],
  "https_redirect_status_code": 426,
  "name": "transformationPayloadRoute",
  "path_handling": "v0",
  "sources": null,
  "preserve_host": false,
  "strip_path": true,
  "service": {"id": "807a9c2b-3d5e-4894-a549-38b67eccc19f"},
  "paths": ["/v1/gateway/cliente/:codigo/endereco/estado"],
  "regex_priority": 0,
  "snis": null,
  "protocols": ["http", "https"],
  "hosts": null,
  "request_buffering": true,
  "response_buffering": true,
  "methods": ["PUT"],
  "headers": null
}

2. Body:
{
  "tags": [],
  "https_redirect_status_code": 426,
  "name": "GetAdressToClientByCodeRoute",
  "path_handling": "v0",
  "sources": null,
  "preserve_host": false,
  "strip_path": true,
  "service": {"id": "a896fcc8-4397-43f3-aa86-8419254a4ddd"},
  "paths": ["/v1/gateway/:codigo/endereco"],
  "regex_priority": 0,
  "snis": null,
  "protocols": ["http", "https"],
  "hosts": null,
  "request_buffering": true,
  "response_buffering": true,
  "methods": ["GET"],
  "headers": null
}

3. Body:
{
  "tags": [],
  "https_redirect_status_code": 426,
  "name": "PostAdressToClientByCodeRoute",
  "path_handling": "v0",
  "sources": null,
  "preserve_host": false,
  "strip_path": true,
  "service": {"id": "e4bcd14c-8aa7-4793-befb-6d74ca5a4eb0"},
  "paths": ["/v1/gateway/cliente/:codigo/endereco"],
  "regex_priority": 0,
  "snis": null,
  "protocols": ["http", "https"],
  "hosts": null,
  "request_buffering": true,
  "response_buffering": true,
  "methods": ["POST"],
  "headers": null
}

4. Body:
{
  "tags": [],
  "https_redirect_status_code": 426,
  "name": "PostClientRoute",
  "path_handling": "v0",
  "sources": null,
  "preserve_host": false,
  "strip_path": true,
  "service": {"id": "3d97d2a1-fcde-49c8-8d9f-d0cf0e8eebd6"},
  "paths": ["/v1/gateway/cliente"],
  "regex_priority": 0,
  "snis": null,
  "protocols": ["http", "https"],
  "hosts": null,
  "request_buffering": true,
  "response_buffering": true,
  "methods": ["POST"],
  "headers": null
}

5. Body:
{
  "tags": [],
  "https_redirect_status_code": 426,
  "name": "GetAllClientsRoute",
  "path_handling": "v0",
  "sources": null,
  "preserve_host": false,
  "strip_path": true,
  "service": {"id": "a460c62b-de07-49e9-9e7f-c8f76c17179f"},
  "paths": ["/v1/gateway/all/cliente"],
  "regex_priority": 0,
  "snis": null,
  "protocols": ["http", "https"],
  "hosts": null,
  "request_buffering": true,
  "response_buffering": true,
  "methods": ["GET"],
  "headers": null
}

6. Body:
{
  "tags": [],
  "https_redirect_status_code": 426,
  "name": "LoginRoute",
  "path_handling": "v0",
  "sources": null,
  "preserve_host": false,
  "strip_path": true,
  "service": {"id": "44eeeed1-f08a-46bc-838d-8c39c81ada0c"},
  "paths": ["/v1/gateway/login"],
  "regex_priority": 0,
  "snis": null,
  "protocols": ["http", "https"],
  "hosts": null,
  "request_buffering": true,
  "response_buffering": true,
  "methods": ["POST"],
  "headers": null
}

7. Body:
{
  "tags": [],
  "https_redirect_status_code": 426,
  "name": "GetClientsByCodeRoute",
  "path_handling": "v0",
  "sources": null,
  "preserve_host": false,
  "strip_path": true,
  "service": {"id": "2fe95c09-cd72-4d2a-b85b-b806978e7170"},
  "paths": ["/v1/gateway/cliente/:codigo"],
  "regex_priority": 0,
  "snis": null,
  "protocols": ["http", "https"],
  "hosts": null,
  "request_buffering": true,
  "response_buffering": true,
  "methods": ["GET"],
  "headers": null
}


___________________________________________________________________________________________________
Container Kong:

docker run --hostname=348250c87214 --user=kong --env=KONG_PG_HOST=kong-database --env=KONG_PG_PASSWORD=kongpass --env=KONG_ADMIN_ACCESS_LOG=/dev/stdout --env=KONG_PROXY_ERROR_LOG=/dev/stderr --env=KONG_ADMIN_ERROR_LOG=/dev/stderr --env=KONG_ADMIN_GUI_URL=http://localhost:8002 --env=KONG_DATABASE=postgres --env=KONG_PG_USER=kong --env=KONG_PROXY_ACCESS_LOG=/dev/stdout --env=KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --env=ASSET=ce --env=KONG_VERSION=3.6.1 --network=kong-net -p 8000:8000 -p 127.0.0.1:8001:8001 -p 127.0.0.1:8002:8002 -p 8443:8443 -p 127.0.0.1:8444:8444 --restart=no --label='maintainer=Kong Docker Maintainers <docker@konghq.com> (@team-gateway-bot)' --label='org.opencontainers.image.ref.name=ubuntu' --label='org.opencontainers.image.version=22.04' --runtime=runc -d kong:3.6.1


docker run --hostname=0b6cc32fa6b5 --env=POSTGRES_USER=kong --env=POSTGRES_DB=kong --env=POSTGRES_PASSWORD=kongpass --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/13/bin --env=GOSU_VERSION=1.17 --env=LANG=en_US.utf8 --env=PG_MAJOR=13 --env=PG_VERSION=13.15-1.pgdg120+1 --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data --network=kong-net -p 5432:5432 --restart=no --runtime=runc -d postgres:13