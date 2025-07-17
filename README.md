# coffee shop app

This is full-stack coffee shop web app that allows users to browse, customize and order coffee products. The app features real-time price updates, dynamic filtering, detailed product pages, cart management with notes and a streamlined order flow with summary and confirmation.
Additionally, the app supports user registration and login. Logged users have access to a personal dashboard with favorite products, account settings and order history. They can add items to favorites, update their personal data or password and review past orders.
Logged and guest users can send messages to store by a modal contact form available in the footer.

https://coffee-shop-app-hbwo.onrender.com/

## Description

The application consists of the following pages:

- `/` – Search for products and view all available items. Each product can be customized and added to the cart. Price updates live as parameters change.
- `/products/:id` – Detailed view of a single product. Options can be modified and the product added to the cart with updated price.
- `/products/varieties/:variety` – Filters products by variety.
- `/products/search/:searchPhrase` – Filters products by search phrase.
- `/cart` – Displays current cart contents. Allows editing/removing products and adding individual notes by click on the pencil icon. All prices are updated live.
- `/order/form` – Order placement form.
- `/order/summary` – Displays order summary before final submission.
- `/register` – User registration form.
- `/login` – User login form.
- `/logout` – Logs out the current user.
- `/user/orders` – Displays a logged-in user order history. Clicking on order number opens detailed view.
- `/user/favorites` – Displays a logged-in user favorite products.
- `/user/settings` – User settings dashboard for logged-in users.
- `/user/settings/data` – Form to update user personal data (firstname, lastname, phone, address).
- `/user/settings/password` – Form to change the user password.


## Technologies Used

- **Frontend:** React, Redux (with Thunk middleware), React-Bootstrap & Bootstrap, SCSS Modules
- **Backend:** NestJS, Prisma ORM, MySQL, TypeScript

## Work in Progress

Development of the admin panel is currently in progress.

## Configuration

At first create your empty database in MySQL.

To run the application, you need an `.env` file with configuration data.

Copy the .env.example file as .env:

`cp .env.example .env`

Insert your data into the key values.

## Installation

To install client dependencies use:

```bash
npm run client:install
```

To install backend dependencies use:

```bash
npm install
```

## Prisma setup

Before running the server, make sure to generate the Prisma client:

```bash
npx prisma generate
```

To create tables in your database based on the Prisma schema:

```bash
npx prisma db push 
```

To populate the database with initial data:

```bash
npx prisma db seed  
```


## Running the app

```bash
# development
npm run start

# frontend (React dev server)
npm run client:start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Building the App (for production)

To build the backend:

```bash
 npm run build
```

To build the frontend:

```bash
npm run client:build
```

Run the backend in production mode:

```bash
npm run start:prod
```

## Available Scripts

```bash
npm install # installs backend dependencies

npm run client:install  # installs frontend dependencies

npm run start # starts the NestJS backend (dev)

npm run client:start # starts the React frontend (dev)

npm run build  # builds the backend

npm run client:build # builds the frontend

npm run format # formats backend code with Prettier

```
## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Support

This project is built with NestJS, an MIT-licensed open source framework.  
If you'd like to support the NestJS project, please [read more here](https://docs.nestjs.com/support).


## License

This project is licensed under the [MIT License](LICENSE).

## Author

Monika Grzanek
