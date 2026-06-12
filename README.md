# Cardápio Digital

Sistema Full Stack para gerenciamento de um cardápio digital desenvolvido com React, TypeScript, Spring Boot e PostgreSQL.

---

# Estrutura do Projeto

```text
Cardapio-Digital/
│
├── cardapio-back/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── cardapio-front/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```

---

# Configuração do Banco de Dados

Crie um banco PostgreSQL chamado:

```sql
CREATE DATABASE food;
```

---

## application.properties

Arquivo localizado em:

```text
cardapio-back/src/main/resources/application.properties
```

Exemplo de configuração:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/food
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

# Executando o Projeto

## 1. Backend

Acesse:

```bash
cd cardapio-back
```

Execute:

```bash
mvn spring-boot:run
```

A API ficará disponível em:

```text
http://localhost:8080
```

---

## 2. Frontend

Acesse:

```bash
cd cardapio-front
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

---

# Autor

**André Arthur da Silva Junior**

Projeto desenvolvido para fins acadêmicos e aprendizado de tecnologias Full Stack.
