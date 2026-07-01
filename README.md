# API REST - Fórum de Perguntas e Respostas

API REST desenvolvida em **Node.js**, **Express** e **Prisma ORM** para gerenciamento de um fórum de perguntas e respostas.

FrontEnd desenvolvido em **HTML**, **CSS** e **JavaScript**
---

# 📋 Sobre o Projeto

Este é um projeto full-stack onde fornece toda a infraestrutura para um sistema no modelo de um fórum, permitindo que usuários possam:

* Criar uma conta
* Realizar login
* Criar perguntas
* Responder perguntas

A autenticação é realizada utilizando **JSON Web Token (JWT)** e as senhas são armazenadas de forma segura utilizando **bcrypt**.

---

# 🚀 Funcionalidades

## Usuários

* Cadastro de usuários
* Login com autenticação JWT
* Criptografia de senha utilizando bcrypt

---

## Perguntas

* Criar pergunta
* Listar perguntas
* Buscar perguntas com seus respectivos autores
* Buscar perguntas juntamente com suas respostas

---

## Respostas

* Criar resposta
* Listar respostas
* Associação automática entre usuário e pergunta

---

# 🛠 Tecnologias Utilizadas

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* JWT (Json Web Token)
* Bcrypt
* CORS
* Dotenv
* Nodemon

---

# 📦 Dependências

| Dependência    | Finalidade                                           |
| -------------- | ---------------------------------------------------- |
| express        | Framework para criação da API                        |
| prisma         | ORM para acesso ao banco de dados                    |
| @prisma/client | Cliente Prisma                                       |
| bcrypt         | Criptografia de senhas                               |
| jsonwebtoken   | Autenticação JWT                                     |
| cors           | Liberação de requisições entre origens               |
| dotenv         | Variáveis de ambiente                                |
| nodemon        | Reinicialização automática durante o desenvolvimento |

---

# ✅ Requisitos Mínimos

Antes de executar o projeto, instale:

* Node.js 18 ou superior
* PostgreSQL 15 ou superior
* Git

---

# 🧪 Ferramenta Recomendada para Testes

Utilize o **Postman** para testar os endpoints da API.

---

# 📥 Clonando o Projeto

```bash
git clone <LINK_DO_REPOSITORIO>

cd nome-do-projeto
```

---

# 📦 Instalando as Dependências

```bash
npm install
```

---

# ⚙ Configurando o Banco de Dados

Crie um arquivo `.env` na raiz do projeto.

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/forum"

PORT=3000

JWT_SECRET="sua_chave_secreta"
```

---

# 🗄 Executando as Migrations

```bash
npx prisma migrate dev --name init
```

---

# ▶ Executando a Aplicação

Modo desenvolvimento (Nodemon):

```bash
npm run dev
```

Modo produção:

```bash
node server.js
```
```
FrontEnd:

Basta abrir o arquivo index.html ou caso tenha a extensão Live Server basta executa-lo.
```
Caso queira testar a parte API ficará disponível em:

```text
http://localhost:3000
```

---

# 📌 Principais Endpoints

## Autenticação

| Método | Endpoint    | Descrição         |
| ------ | ----------- | ----------------- |
| POST   | `/usuario/cadastro` | Cadastrar usuário |
| POST   | `/usuario/login`  | Realizar login    |

---

## Perguntas

| Método | Endpoint         | Descrição              |
| ------ | ---------------- | ---------------------- |
| GET    | `/perguntas`     | Listar perguntas       |
| POST   | `/perguntas`     | Criar pergunta         |
| PUT    | `/perguntas/:id` | Atualizar pergunta     |
| DELETE | `/perguntas/:id` | Excluir pergunta       |

---

## Respostas

| Método | Endpoint         | Descrição              |
| ------ | ---------------- | ---------------------- |
| GET    | `/respostas`     | Listar respostas       |
| POST   | `/respostas`     | Criar resposta         |
| PUT    | `/respostas/:id` | Atualizar resposta     |
| DELETE | `/respostas/:id` | Excluir resposta       |

---

# 📷 Exemplos de Requisições

### Login

```http
POST http://localhost:3000/usuario/login
```

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

---

### Cadastro

```http
POST http://localhost:3000/usuario/cadastro
```

```json
{
  "name": "Gabriel",
  "email": "gabriel@email.com",
  "password": "123456"
}
```

---

### Criar Pergunta

```http
POST http://localhost:3000/perguntas
```

```json
{
  "title": "Como funciona o Prisma?",
  "description": "Gostaria de entender melhor o ORM Prisma.",
  "userId": 1
}
```

---

### Criar Resposta

```http
POST http://localhost:3000/respostas
```

```json
{
  "descricao": "O Prisma é um ORM para Node.js que facilita a comunicação com bancos de dados.",
  "questionId": 1,
  "userId": 1,

}
```
---

# 👨‍💻 Desenvolvido por

* Beatriz Bonametti
* Gabriel Hideki Tutia
* Thayrine Santos
