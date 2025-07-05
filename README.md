# coffee shop app

## Description

This is fullstack coffee shop app based on React, NestJS, TypeScript, Prisma ORM and MMySQL. 

It

## Configuration

To run the application, you need an `.env` file with configuration data.
At first create your empty database in MySQL.
Copy the .env.example file as .env:

`cp .env.example .env`

Insert your data into the key values.

## Installation

```bash
$ npm install
```

## Prisma setup
Make sure to generate the Prisma client before running the server:

```bash
$ npx prisma generate
```

To generate table in database use:

```bash
$ npx prisma db push 
```

Togenerate start data use:

```bash
$ npx prisma db seed  
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
