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
|method|POST|
|require|id|

#### Update task
|path|/tasks/add/|
|---|---|
|method|PATCH|
|require|id|