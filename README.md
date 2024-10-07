# Capivara-Dex

## Visão Geral
Capivara-Dex é uma aplicação full-stack para gerenciar informações sobre capivaras, desenvolvida com Vue.js no front-end e Node.js/Express no back-end. A aplicação permite que os usuários visualizem, adicionem, editem e excluam informações sobre capivaras.

## Tecnologias Utilizadas

- **Vue.js**: Framework para construir interfaces de usuário reativas.
- **Vuex**: Biblioteca para gerenciamento de estado global na aplicação Vue.
- **Node.js/Express**: Servidor back-end para lidar com rotas de API e operações CRUD.
- **SQLite**: Banco de dados leve para persistência de dados.
- **Docker**: Containerização da aplicação para facilitar a execução e deploy.
- **Docker Compose**: Orquestração de containers para rodar o front-end e o back-end em conjunto.
- **Render**: Plataforma de deploy utilizada para hospedar o front-end e o back-end.

## Funcionalidades

- Listagem de capivaras em um formato de card.
- Filtros para buscar capivaras por nome.
- Formulário para adicionar novas capivaras.
- Função de editar e excluir capivaras existentes.
- API REST para operações CRUD com capivaras.

## Estrutura do Projeto

### Front-End
O front-end é desenvolvido em Vue.js, estruturado em componentes modulares:
- **CapivaraForm.vue**: Formulário para adicionar ou editar uma capivara.
- **CapivaraCard.vue**: Exibe os dados da capivara em formato de card.
- **App.vue**: Componente principal que gerencia as tabs e o estado da aplicação.

### Back-End
O back-end foi construído com Node.js e Express, responsável por fornecer uma API REST para o front-end consumir.
- **Rotas principais**:
  - `GET /api/capivaras`: Retorna todas as capivaras.
  - `POST /api/capivaras`: Adiciona uma nova capivara.
  - `PUT /api/capivaras/:id`: Atualiza uma capivara existente.
  - `DELETE /api/capivaras/:id`: Deleta uma capivara.

## Como Rodar o Projeto

### Pré-requisitos
- **Node.js**: Instale o Node.js em [nodejs.org](https://nodejs.org)
- **SQLite**: O banco de dados utilizado é o SQLite, que já está incluído como dependência do projeto.
- **Docker**: Certifique-se de ter o Docker instalado. Baixe-o em [docker.com](https://www.docker.com)
- **Docker Compose**: Para facilitar a execução da aplicação localmente.

### Passos para execução localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/capivara-dex.git

## Links para Produção

### **Backend**: https://capivaras-backend.onrender.com
### **Frontend**: https://capivaras-frontend.onrender.com

