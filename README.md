# Table of Contents
- [Getting Started](#getting-started)
    - [What You Need](#what-you-need)
    - [Running The App Locally](#running-the-app-locally)
- [Tech-Stack](#tech-stack)
    - [Front-End](#front-end)
        - [React](#react)
        - [React Router](#react-router)
        - [Material-UI](#material-ui)
        - [Typeface Roboto](#typeface-roboto)
    - [Back-End](#back-end)
        - [Database](#database)
        - [Node.js](#node.js)
        - [Express](#express)
- [API Documentation](#api-documentation)
    - [Back-End API](#back-end-api)
        - [Endpoints](#endpoints)
- [Testing](#testing)
    - [Cypress](#cypress)
    - [Mocha/Chai](#mocha/chai)

# Getting Started
## What You Need
### Firebase Account
- Sign up for a Firebase Account
- Create a Firebase Project
- Find your project's configuration in the `General` tab of your project's settings dashboard
- Copy the config settings into a `.env` file placed in the `/client` directory of your project's codebase.

The environment variable names should look like this:
```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
```
- Go to the `Service accounts` tab in your Firebase project settings and generate a new private key
- Copy the the keys into a new `.env` file that will be placed in the root directory of your project's codebase

The environment variable names should look like this:

```
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
```
## Running The App Locally
Make sure you have the `knex CLI` installed: `yarn global add knex`

- Clone and/or Fork the repository
- Run `yarn install` in the root directory to install server dependencies
- Run `knex migrate:latest` to setup the local database. 
- Run `yarn dev` in the root directory to start the server with nodemon
- Run `yarn install` in the client directory to install client dependencies
- Run `yarn start` in the client directory to start the client app

# Tech-Stack
## Front-End
### React
[View Dependency](https://reactjs.org/)

### React Router
[View Dependency](https://reacttraining.com/react-router/web/guides/quick-start)

### Material-UI
Material-UI is a component library that follow's Google's Material Design standard. I decided to use this library as opposed to a library like Bootstrap because Material-UI offers sleeker styling and a wide range of ready-to-use components. | [View Dependency](https://github.com/mui-org/material-ui)

### Typeface Roboto
Self hosting fonts can significantly speed up a site's loading speed by avoiding an extra network request. Material-UI was built with the `Roboto` font in mind so I used this self-hosted `Roboto` font. | [View Dependency](https://github.com/KyleAMathews/typefaces/tree/master/packages/roboto)

## Back-End
### Database
SQLite3 is used for local development because of how easy it is to setup.
The app uses PostgreSQL in production

### Node.js
### Express.js

# API Documentation
## Back-End API

Every request from the client has an authorization header containing a token given by firebase upon login. Every request from the client passes through a middleware function that verifies the token in the authorization header. If the token is verified, the middleware function attaches the returned user's Firebase UID to the request body. As a result, **every request will contain the user's UID**. This allows us to always have a way to reference the user in the database without having to pass the user's ID as a parameter in the URL. If needed, the uid can be accessed in each endpoint like so, 
```
router.post('/example-path', (req, res) => {
    const { uid } = req.body;

    /* The rest of the code */
})
```
### Endpoints

**POST** `/verifyregistration`

Upon logging in, the client sends a request to this path. This endpoint checks if the user is already registered in the database. If the user doesn't exist, a new record is created in the DB for the user.

# Testing
## Cypress
Cypress is used for testing the front end. You will need a `cypress.env.json` file in the `/client` folder for environment variables.
The variables should be your email/password after you've already created an account through the app.
The file should look like this:
```
{
    "email": YOUR-EMAIL,
    "password": YOUR-PASSWORD
} 
```
## Mocha/Chai