# Comtemplato Backend


## Instruções para configurar

- Crie um banco de dados Postgres e guarde o nome de seu usuário e senha master;
- Crie um arquivo .env com base no arquivo .env.example e altere a variável DATABASE_URL de acordo com os seus dados;
  para isso, troque "usuario" pelo seu usuário master do Postgres, troque "senha" pela sua senha do usuario master e troque
  "nome_do_banco" pelo nome utilizado para criar o banco;
- Substitua o valor da variável SECRET_KEY para um valor mais complexo;
- Abra o terminal na pasta raiz do projeto;
- Rode o seguinte comando para instalar as bibliotecas:

```bash
yarn
```
- Rode o seguinte comando para criar as tabelas no banco de dados:

```bash
yarn prisma migrate dev
```
- Rode o seguinte comando para criar o usuário de acesso na aplicação:

```bash
yarn prisma db seed
```
- Esse último comando irá criar o usuário de username: "usuario" e de password: "teste".
- Para rodar a aplicação utilize o seguinte comando:

```bash
yarn dev
```
