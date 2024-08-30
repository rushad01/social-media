<h1 align="center">
Social Media API
</h1>
<p align="center">
MongoDB, Expressjs, Nodejs
</p>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/georgesimos/nodejs-starter/blob/master/LICENSE)

Social Media API  web applications built with:

- [MySQl](https://www.mysql.com/) - A SQL database used to store the application data.
- [ExpressJS](https://expressjs.com/) - fast node.js network app framework.
- [nodeJS](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine
- JWT Authentication with [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- JSON schema based validation using [express-validator](https://express-validator.github.io/)
- file upload using [multer](https://github.com/expressjs/multer)
- ORM support for SQL database using [sequelize](https://github.com/sequelize/sequelize/blob/main/README.md)
## Features

- **Authentication** using Email and Password
- Add / Update / Delete Users
- Add / Update / Delete authenticated Users Post
- Add / Update / Delete Profile Image
- Add / Update / Delete comments from Post

[Full API Doc](https://github.com/rushad01/social-media/blob/main/routes/README.md)

## Getting Started

clone the repository

```sh
$ git clone https://github.com/rushad01/social-media.git social-media
$ cd social-media
```

Install the dependencies and devDependencies

```sh
$ npm install
```

Set environment variables

```sh
cp .env.example .env
```

Start the server

```sh
$ npm start
$ npm run dev # with nodemon live update
```

## Application Structure

```
app
├── config
│   └── mysql.js
├── middlewares   
|   └── auth.js
├── models
│   └── Users
|   └── Post
|   └── Comment
|   └── ProfileImage
├── routes
│   └── api
│    │   └── users.js
│    └── index.js      
└── app.js
```

- <b>app.js</b> - The application entry point. This file defines our express server and connects it to MongoDB using mongoose. It also defines the api routes.
- <b>config/ </b> - This folder contains configuration for sequelize
- <b>middlewares/ </b> - This folder contains configuration for auth middleware and validation middleware
- <b>models/</b> - This folder contains the Schema definitions for our Sequelize Models.
- <b>routes/ </b> - This folder contains the route definitions for our API.



## Dependency

Social media api is currently extended with the following dependency. Instructions on how to use them in your own application are linked below.

## Server

| Plugin                 | README                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| bcryptjs               | [dependency/bcryptjs/README.md](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md)                                  |
| dotenv                 | [dependency/dotenv/README.md](https://github.com/motdotla/dotenv/blob/master/README.md)                                      |
| express                | [dependency/express/README.md](https://github.com/expressjs/express/blob/master/Readme.md)                                   |
| jsonwebtoken           | [dependency/jsonwebtoken/README.md](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md)                        |
| sequelize              | [dependency/sequelize/README.md](https://github.com/sequelize/sequelize/blob/main/README.md)                                 |
| nodemon                | [dependency/nodemon/README.md](https://github.com/remy/nodemon/blob/master/README.md)                                        |
| multer                 | [dependency/multer/README.md](https://github.com/expressjs/multer/blob/master/README.md)                                     |
| express-validator      |[dependency/express-validator/README.md](https://github.com/express-validator/express-validator/blob/master/README.md)        |

## License

MIT
