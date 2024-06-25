
# CajuBoard

![CI](https://github.com/jarioneto/admission/workflows/CI/badge.svg?branch=main)
[![Netlify Status](https://api.netlify.com/api/v1/badges/895003b0-e3d7-4b6b-bacb-98b3c7113262/deploy-status)](https://app.netlify.com/sites/caju-board/deploys)
![react](https://img.shields.io/github/package-json/dependency-version/jarioneto/admission/react)
![typescript](https://img.shields.io/github/package-json/dependency-version/jarioneto/admission/typescript)

Aplicação desenvolvida como avaliação para um desafio técnico.

![CajuBoard dashboard](screenshots/dashboard-page.png)

![CajuBoard admission](screenshots/admission-page.png)

Para acesso a aplicação utilizar o link a seguir [CajuBoard](https://caju-board.netlify.app).

Stack utilizada no desenvolvimento:
* TypeScript
* React
* Vite
* Jest
* React Testing Library
* ESlint
* Prettier
* CI/CD (Github Actions)
  * CI (**build, lint, test**)
  * CD (**Deploy to Netlify**)

# Configuração inicial

Execute os passos abaixo para realizar a configuração inicial da aplicação.


### 1 - Variáveis de ambiente

Crie uma cópia do arquivo .env.example e e renomeie para .env

```bash
cp .env.example .env
```

Edite o arquivo criado no passo anterior e informe a URL da api

```bash
VITE_ADMISSION_API_URL="http://localhost:3000"
```


### 2 - Instalação das dependências

Para instalar as dependências da aplicação execute o comando abaixo:

```bash
yarn
```

# Scripts disponíveis

### Execução em modo de desenvolvimento

```bash
yarn dev
```

### Executar linter do código

```bash
yarn lint
```

### Criar build de produção

```bash
yarn build
```

### Executar testes

```bash
yarn test:dev
```

### Iniciar o JSON Server

```bash
yarn init:db
```