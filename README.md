# Api para agenda de tarefas
Essa versão da api utiliza o banco de dados mongodb em nuvem, dessa forma, não será necessário que tenha o mongo instalado em sua máquina. 
### Passos iniciais
Primeiramente, devemos instalar as dependências do sistema. Podemos fazer isso rodando o comando ` npm install `.
 
Após instalarmos as dependências, vamos configurar a conexão com o banco de dados. Você deve criar uma cópia do arquivo (*.env.example*) e renomeá-la para (*.env*). Neste arquivo, você poderá alterar a porta na qual o servidor irá rodar alterando o valor da variável `PORT`. Também será necessário a adição de um hash na variável `SECRET_KEY`, você pode gerar um hash pelo site [Gerador de hash MD5](https://www.md5hashgenerator.com/).
 
Pronto! Agora basta rodar o comando `npm start` e o servidor estará rodando.
 
## Rotas
Para acessar as rotas do servidor use a uri *localhost:"porta"/api/"recurso-desejado"*, por exemplo, *localhost:3000/api/register*
### Rotas de User
 
#### <span style="color:green">Post _/register_</span>
 
A rota _/register_ é responsável por pelo cadastramento de novos usuários
 
O corpo esperado da requisição é um json com nome, email e senha, por exemplo:
 
```json
{
	"name": "João",
	"email": "joão.email@gmail.com",
	"password": "123"
}
 ```
 Sendo esperado como resposta os dados do usuário cadastrado mais o token de autenticação:
 ```json
{
	"date": {
		"name": "João",
		"email": "joão.email@gmail.com",
		"password": "$2b$10$fCXu4.6J1E0ElIQRA2oL/OXWjAmv0WBWUEIVrG30JrXuaWeH8AcZe",
		"_id": "61e0ae56f6085dda7053fa10",
		"__v": 0
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTBhZT
    U2ZjYwODVkZGE3MDUzZmExMCIsImlhdCI6MTY0MjQ1MTM0OSwiZXhwIjoxNj
    yNDU0OTQ5fQ.bHazWBnBRudO20heXt7KRk9dIzAzVPk6xrjLjjv-lOM"
}
 ```
#### <span style="color:green">Post _/Login_</span>
A rota _/login_ é responsável por logar usuários já existentes.
 
O corpo esperado da requisição é um json com email e senha:
 
```json
{
	"email": "joão3.email@gmail.com",
	"password": "123"
}
 ```
 
 Sendo esperado como resposta os dados do usuário logado mais o token de autenticação:
 
  ```json
 {
	"user": {
		"_id": "61e0ae56f6085dda7053fa10",
		"name": "João",
		"email": "joão.email@gmail.com",
		"__v": 0
	},
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTBhZT
    U2ZjYwODVkZGE3MDUzZmExMCIsImlhdCI6MTY0MjQ1MTM0OSwiZXhwIjoxNj
    yNDU0OTQ5fQ.bHazWBnBRudO20heXt7KRk9dIzAzVPk6xrjLjjv-lOM"
}
 ```
 
#### Autenticação
Para conseguir usar as demais rotas, será necessário que o usuário esteja logado no sistema. Para realizar o autenticação é necessário passar um header com o nome "Authorization" com valor "Bearer seu-token" (seu-token deve ser substituído pelo valor do campo "token" retornado na rota de /login ou /register):
 
 
| Header    | Value|
| ----    | ----------         |
| Authorization    | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I...
#### <span style="color:purple">Get _/user_</span>
 A rota _/user_ é apenas uma rota para testes de desenvolvimento. Ela é responsável por listar todos usuário cadastrado e o id do usuário logado:
 ```json
 {
"date": [
        {
            "_id": "61dce0bf273c00f76cea2853",
            "name": "João",
            "email": "joão.email@gmail.com",
            "__v": 0
        },
        {
            "_id": "61dce5f03ae537c21b93ef7f",
            "name": "João2",
            "email": "joão2.email@gmail.com",
            "__v": 0
        }
	],
	"id": "61dce60c3ae537c21b93ef85"
}
 ```
### Rotas de notas
#### <span style="color:green">Post _/note_</span>
 
A rota post _/note_ é responsável pela criação de novas notas.
 
 O corpo esperado da requisição é um json contendo título, descrição e um array de tasks, sendo esse último optativo:
 
 ```json
{
    "title": "Nova nota",
    "description": "Descrição",
    "tasks": [
        {
            "title": "Task 01",
            "taskRelevance": 10,
            "completed": false
        },
        {
            "title": "Task 02",
            "taskRelevance": 20,
            "completed": true
        }
    ]
}
 ```
 
 Sendo esperado como resposta os dados da nota enviados mais a data de criação:
  ```json
 
{
	"title": "Nova nota",
	"description": "Descrição",
	"createdAt": "2022-01-17T20:35:25.881Z",
	"updatedAt": "2022-01-17T20:35:25.881Z",
	"userId": "61e0ae56f6085dda7053fa10",
	"tasks": [
		{
			"title": "Task 01",
			"taskRelevance": 10,
			"completed": false,
			"id": "86826863-9b79-43a6-9016-dc7144fa9e0c",
			"createdAt": "2022-01-17T20:35:25.885Z",
			"updatedAt": "2022-01-17T20:35:25.885Z"
		},
		{
			"title": "Task 02",
			"taskRelevance": 20,
			"completed": true,
			"id": "c251289e-33be-49a2-a44d-f4cb655629ec",
			"createdAt": "2022-01-17T20:35:25.885Z",
			"updatedAt": "2022-01-17T20:35:25.885Z"
		}
	],
	"_id": "61e5d30d10c9a6b7fc64c785",
	"__v": 0
}
  ```
  #### <span style="color:purple">Get _/note_</span>
 
  A rota get _/note_ é responsável por listar todas as notas referentes ao usuário logado:
  ```json
[
    {
        "title": "Nova nota",
        "description": "Descrição",
        "createdAt": "2022-01-17T20:35:25.881Z",
        "updatedAt": "2022-01-17T20:35:25.881Z",
        "userId": "61e0ae56f6085dda7053fa10",
        "tasks": [
            {
            "title": "Task 01",
            "taskRelevance": 10,
            "completed": false,
            "id": "86826863-9b79-43a6-9016-dc7144fa9e0c",
            "createdAt": "2022-01-17T20:35:25.885Z",
            "updatedAt": "2022-01-17T20:35:25.885Z"
            },
            {
            "title": "Task 02",
            "taskRelevance": 20,
            "completed": true,
            "id": "c251289e-33be-49a2-a44d-f4cb655629ec",
            "createdAt": "2022-01-17T20:35:25.885Z",
            "updatedAt": "2022-01-17T20:35:25.885Z"
            }
        ],
        "_id": "61e5d30d10c9a6b7fc64c785",
        "__v": 0
    },
    {
        "title": "Uma outra nota",
        "description": "Descrição da outra nota",
        "createdAt": "2022-01-17T20:40:25.881Z",
        "updatedAt": "2022-01-17T20:40:25.881Z",
        "userId": "61e0ae56f6085dda7053fa10",
        "_id": "61e5d30d10c9a6b7fc6da0d0",
        "__v": 0
    }
]
  ```
 
#### <span style="color:purple">Get _/note/:idNote_ </span>
A rota get _/note/:idNote_ é responsável por listar uma única nota de acordo com o id passado por parâmetro:
 ```json
{
    "title": "Uma outra nota",
    "description": "Descrição da outra nota",
    "createdAt": "2022-01-17T20:40:25.881Z",
    "updatedAt": "2022-01-17T20:40:25.881Z",
    "userId": "61e0ae56f6085dda7053fa10",
    "_id": "61e5d30d10c9a6b7fc6da0d0",
    "__v": 0
}
 ```
#### <span style="color:orange"> Put _/note/:idNote_ </span>
A rota put _/note/:idNote_ é responsável por alterar dados de uma única nota. Nesta rota é esperado o parâmetro com o id da nota que será alterada. Pode-se alterar os campos title, description e as tasks da nota:
 ```json
{
"title": "Alterando o titulo da nota",
"description": "Alterando a descrição da nota"
}
 ```
Sendo esperado como reposta os dados da nota alterada:
 ```json
{
    "title": "Alterando o titulo da nota",
	"description": "Alterando a descrição da nota",
	"createdAt": "2022-01-17T20:40:25.881Z",
	"updatedAt": "2022-01-20T20:12:21.881Z",
	"userId": "61e0ae56f6085dda7053fa10",
    "_id": "61e5d30d10c9a6b7fc6da0d0",
	"__v": 0 
}
 ```
 
 #### <span style="color:red">Delete _/note/:idNote_ </span>
 A rota delete _/note/:idNote_ é responsável por deletar uma única nota. Nesta rota também é esperado id da nota que será deletada. Após ser deletada é esperada a resposta de confirmação:
 
 ```json
{
    "message": "Note successfully deleted"
}
 ```
 
### Rotas de tasks
 
#### <span style="color:green">Post _/note:idNote/task_</span>
 
A rota post _/note:idNote/task_ é responsável por adicionar nova task em uma nota. É esperado que se passe por parâmetro o id nota na qual será adicionada a task.
 
O corpo esperado da requisição é um json contendo título, a relevância e se a task foi completada:
 
```json
{
    "title": "Task 2",
    "taskRelevance": 10,
    "completed": false
}
 ```
Sendo esperado como resposta os dados da nota com a nova task:
 
```json
{
	"_id": "61e0b75a5657e59c6b6ad0a0",
	"title": "Nova nota",
	"description": "Descrição",
	"createdAt": "2022-01-13T23:35:33.920Z",
	"updatedAt": "2022-01-13T23:35:54.536Z",
	"tasks": [
            {
                "title": "Task 01",
                "taskRelevance": 6,
                "completed": true,
                "createdAt": "2022-01-13T23:38:05.694Z",
                "updatedAt": "2022-01-13T23:40:53.953Z"
            },
            {
                "title": "Task 2",
                "taskRelevance": 10,
                "completed": false,
                "createdAt": "2022-01-13T23:43:18.112Z",
                "updatedAt": "2022-01-13T23:43:18.112Z"
            }
    ]
}
 ```
 
#### <span style="color:purple"> Get _/note:idNote/task_</span>
 
A rota  get _/note:idNote/task_ é responsável por listar todas as tasks de uma nota. É esperado que se passe o id da nota por parâmetro.
 
```json
{
    [
        {
            "title": "Task 01",
            "taskRelevance": 7,
            "completed": false,
            "id": "86826863-9b79-43a6-9016-dc7144fa9e0c",
            "createdAt": "2022-01-17T20:35:25.885Z",
            "updatedAt": "2022-01-17T20:35:25.885Z"
        },
        {
            "title": "Task 02",
            "taskRelevance": 10,
            "completed": true,
            "id": "c251289e-33be-49a2-a44d-f4cb655629ec",
            "createdAt": "2022-01-17T20:35:25.885Z",
            "updatedAt": "2022-01-17T20:35:25.885Z"
        },
        {
            "title": "Task 03",
            "taskRelevance": 8,
            "completed": false,
            "id": "be9cbb48-07f1-495d-b05a-8b1b5bb62f3e",
            "createdAt": "2022-01-17T20:35:25.885Z",
            "updatedAt": "2022-01-17T20:35:25.885Z"
        }
    ]
}
 
 ```
#### <span style="color:orange">Put _/note:idNote/task:idTask_</span>
 
A _/note:idNote/task:idTask_ é responsável por alterar dados de uma única task. É esperado que seja passado por parâmetro o id nota que contém a task e o id da task que será atualizada. Pode ser alterado os campos title, taskRelevance e completed:
 
```json
{
    "title": "Mudando titulo da task 01",
    "taskRelevance": 5,
    "completed": true
}
 
 ```
 
Sendo esperado como resposta os dados da nota juntamente com a task alterada:
```json
{
	"_id": "61e0b75a5657e59c6b6ad0a0",
	"title": "Nova nota",
	"description": "Descrição",
	"createdAt": "2022-01-13T23:35:33.920Z",
	"updatedAt": "2022-01-13T23:35:54.536Z",
	"tasks": [
            {
                "title": "Mudando titulo da task 01",
                "taskRelevance": 5,
                "completed": true,
                "id": "be9cbb48-07f1-495d-b05a-8b1b5bb6e312g",
                "createdAt": "2022-01-13T23:38:05.694Z",
                "updatedAt": "2022-01-20T12:09:53.953Z"
            },
            {
                "title": "Task 2",
                "taskRelevance": 10,
                "completed": false,
                "id": "be9cbb48-07f1-495d-b05a-8b1b5bb6213d",
                "createdAt": "2022-01-13T23:43:18.112Z",
                "updatedAt": "2022-01-13T23:43:18.112Z"
            }
    ]
}
 ```
 
#### <span style="color:red">Delete _/note/:idNote/task/:idTask_</span>
 
A rota delete _/note:idNote/task:idTask_ é responsável por deletar uma única task de uma nota. É esperado que seja passado por parâmetro o id nota que contém a task e o id da task que será deletado.
 
Sendo esperado como reposta os dados da nota sem a task deletada:
 
```json
{
	"_id": "61e0b75a5657e59c6b6ad0a0",
	"title": "Nova nota",
	"description": "Descrição",
	"createdAt": "2022-01-13T23:35:33.920Z",
	"updatedAt": "2022-01-13T23:35:54.536Z",
	"tasks": [
            {
                "title": "Mudando titulo da task 01",
                "taskRelevance": 5,
                "completed": true,
                "id": "be9cbb48-07f1-495d-b05a-8b1b5bb6e312g",
                "createdAt": "2022-01-13T23:38:05.694Z",
                "updatedAt": "2022-01-20T12:09:53.953Z"
            }
    ]
}
 ```
 
