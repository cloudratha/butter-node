# Butter Your Bae

Butter Your Bae is a Adonis NodeJS Application, with a Vue.js SPA.

Originally design as a proof of concept to demonstrate Vue within a Node Environment.
Butter Your Bae is intended to be an SMS service for Valentine's Day. 
Allowing you to schedule special SMS's to your partner.

## Installation

Ensure you have the following dependencies installed
1. NodeJS - 6.9+
2. NPM - 3.10.+

Clone the repo and cd into the root folder.
```terminal
cd butter-node
npm install
```

Configure the **.env** to connect to your mysql server
```terminal
DB_CONNECTION=sqlite
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_DATABASE=adonis
```

Run the Database migrations
```terminal
./ace migration:run
```
> Make sure the permissions on ace are executable

To start the dev HTTP Server
```terminal
npm run serve:dev
```

## Asset Pipeline

BYB leverages Laravel Mix for asset management.
An additional script has been added to the **package.json** file.

```terminal
npm run mix
```
Laravel Mix automatically transpiles the Vue.js Templates leveraging ES2016.
The following Babel plugins have been added:
1. Babel Runtime
2. Transform Async to Generators

## Information

Currently the state of the app has the following completed:
1. User Registration
2. Routing via SPA - Leveraging Vue-Router
3. Authentication via JWT tokens
4. State Management via Vuex
5. Verification of User Account ( 2FA to be implemented )
6. Order Page with interactive slider
7. Form Validation & Sanitization

## Todo

1. Create Orders & User association
2. Integrate Twillio Service for 2FA & SMS delivery
3. Create a Queue of Messages to be sent ( Feature Dependant )
4. Account Page History & Activity