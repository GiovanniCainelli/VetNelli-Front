# VetNelli Frontend 🐾

Sistema web para gerenciamento de consultas veterinárias desenvolvido com React.

## 🚀 Tecnologias Utilizadas

* React
* React Router DOM
* Axios
* CSS3
* Vite

## ⚙️ Funcionalidades

* Cadastro de consultas veterinárias
* Listagem de consultas
* Edição de consultas
* Exclusão de consultas
* Atualização de status das consultas
* Busca de consultas por nome do dono
* Validação de formulários
* Tratamento de erros retornados pela API
* Interface responsiva

<h2>📸 Screenshots</h2>

<h3>Home</h3>
<p align="center">
  <img src="screenshots/VetNelliFront/Home.PNG" width="900">
</p>

<h3>Cadastro de Consulta</h3>
<p align="center">
  <img src="./screenshots/VetNelliFront/Cadastro.PNG" width="900">
</p>

<h3>Gerenciamento de Consultas</h3>
<p align="center">
  <img src="./screenshots/VetNelliFront/Consultas.PNG" width="900">
</p>

<h3>Validação de Campos</h3>
<p align="center">
  <img src="./screenshots/VetNelliFront/Validacao_Campo.PNG" width="900">
</p>

## 📁 Estrutura do Projeto

```text
src
├── components
├── pages
├── services
├── css
├── App.jsx
└── main.jsx
```

## 🔗 Integração com Backend

O frontend consome a API VetNelli desenvolvida em Spring Boot.

Principais operações disponíveis:

* Criar consultas
* Buscar consultas
* Atualizar consultas
* Alterar status das consultas
* Excluir consultas
* Receber mensagens de validação e erros da API

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8080
```

## ▶️ Como Executar

Clone o projeto:

```bash
git clone https://github.com/GiovanniCainelli/vetnelli-frontend.git
```

Entre na pasta:

```bash
cd vetnelli-frontend
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

## 🎯 Próximas Melhorias

* Autenticação com JWT
* Controle de usuários
* Dashboard com métricas
* Deploy da aplicação
* Testes automatizados

## 👨‍💻 Autor

Desenvolvido por **Giovanni Cainelli**

* Estudante de Análise e Desenvolvimento de Sistemas
* Desenvolvedor Java e React
