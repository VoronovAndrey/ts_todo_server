# Task list server

**Stack:** Node JS, Typescript, mongoDd, mongoose, express JS

## Scripts
**Dev mod**
```sh
yarn dev
```

**Build**
```sh
yarn build
```
**Start server**
```sh
yarn start
```


## .env example

```sh
PORT=8000
MONGO_URI="mongodb+srv://<username>:<password>@todotstest.2eahvpj.mongodb.net/"
```

## _API_

#### Get all tasks
|path|/tasks/get/|
|---|---|
|method|GET|

#### Add new task
|path|/tasks/add/|
|---|---|
|method|POST|
|require|id, todo, isDone|

#### Delete task
|path|/tasks/delete/|
|---|---|
|method|DELETE|
|require|id|

#### Update task
|path|/tasks/update/|
|---|---|
|method|PATCH|
|require|id|