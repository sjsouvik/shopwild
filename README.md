# Shopwild

This is an e-commerce app to meet your needs

## Technology used

Built with

- Frontend - [ReactJS](https://reactjs.org/)
- Backend - [NodeJS](https://nodejs.org/en/), [ExpressJS](ExpressJS)
- Database - [MongoDB](https://www.mongodb.com/)

## Installation

### shopwild-backend

Download the code for meme-backend, open the folder in VS Code, open terminal (Ctrl + ~) and run

```bash
cd shopwild-backend
npm install
```

For database, you can install MongoDB locally or can use MongoDB Atlas for this. Used Atlas for development purpose.

For that go to official site of mongo db, sign up and create cluster and follow this [official documentation](https://docs.atlas.mongodb.com/getting-started/) to connect with MongoDB Atlas.

Create one `.env` file inside `shopwild-backend` directory to store environment variables like port no to run the server or the DB connection string. And use those variables in `index.js` file, to run the app.

```bash
npm start
```

it should show the following messages if everything works fine:

```bash
app is running on http://localhost:8000
Connected to DB
```

### shopwild-frontend

Download the code for meme-frontend, open the folder in VS Code, open terminal (Ctrl + ~) and run

```bash
cd shopwild-frontend
npm install
```

Create one `.env` file inside `shopwild-frontend` directory to store environment variables like backend URL in this case. And use those variables in the code wherever is required to run the app like we need backend url to send request to API so in those cases, we have used environment variable. To store the backend URL in React, we need to write

```bash
REACT_APP_BACKEND = http://localhost:8000
```

Now, run

```bash
npm start
```

We can open [http://localhost:3000](http://localhost:3000) in browser to see whether the app is running or not locally.

## API

Backend API is publicly deployed on [Heroku](https://www.heroku.com/) and accessible on this [URL](https://api-shopwild.herokuapp.com/v1)
