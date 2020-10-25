# Easy User Authentication for React Apps

This repository hosts a React project that defines a Single-Page Application (SPA). You'll secure access to some of its routes using Auth0 User Authentication.

## Get Started

Install the client project dependencies:

```bash
npm install
```

## Set Up Authentication with Auth0

If you haven't already, <a href="https://auth0.com/signup" data-amp-replace="CLIENT_ID" data-amp-addparams="anonId=CLIENT_ID(cid-scope-cookie-fallback-name)">**sign up for a free Auth0 account**</a>.

Once you sign in, Auth0 takes you to the [Dashboard](https://manage.auth0.com/). In the left sidebar menu, click on ["Applications"](https://manage.auth0.com/#/applications).

Then, click the "Create Application" button. A modal opens up with a form to provide a name for the application and choose its type.

- **Name:** Auth0 React Sample

- **Application Type:** Single Page Web Applications

Click the "Create" button to complete the process. Your Auth0 application page loads up.

Your React application will redirect users to Auth0 whenever they trigger an authentication request. Auth0 will present them with a login page. Once they log in, Auth0 will redirect them back to your React application. For that redirecting to happen securely, you must specify in your **Auth0 Application Settings** the URLs to which Auth0 can redirect users once it authenticates them.

As such, click on the "Settings" tab of your Auth0 Application page and fill in the following values:


**Allowed Callback URLs**

```bash
http://localhost:4040
```

**Allowed Logout URLs**

```bash
http://localhost:4040
```

**Allowed Web Origins**

```bash
http://localhost:4040
```

**Scroll down and click the "Save Changes" button.**

Open the React starter project, `auth0-react-sample`, and create a `.env` file under the project directory:

```bash
touch .env
```

Populate `.env` as follows:

```bash
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
REACT_APP_AUTH0_AUDIENCE=https://express.sample
REACT_APP_SERVER_URL=http://localhost:6060
```

The value of `REACT_APP_AUTH0_DOMAIN` is the "Domain" value from the "Settings".

The value of `REACT_APP_AUTH0_CLIENT_ID` is the "Client ID" value from the "Settings".

## Run the Project

Run the client project:

```bash
npm start
```

The application runs by on port `4040` to mitigate conflicting with other client applications you may be running.

Visit [`http://localhost:4040/`](http://localhost:4040/) to access the starter application.

## Set up the Demo API

### Get the Express API demo

Clone the `auth0-express-js-sample` repo:

```bash
git clone git@github.com:auth0-blog/auth0-express-js-sample.git
```

Make the `auth0-express-js-sample` directory your current directory:

```bash
cd auth0-express-js-sample
```

Install the Node.js project dependencies:

```bash
npm install
```

### Connect the Express API with Auth0

Head to the [APIs section in the Auth0 Dashboard](https://manage.auth0.com/#/apis), and click the "Create API" button.

Then, in the form that Auth0 shows:
 
- Add a **Name** to your API:

```bash
Auth0 Express Sample
```

- Set its **Identifier** value:

```bash
https://express.sample
```

- Leave the signing algorithm as `RS256` as it's the best option from a security standpoint.

With these values in place, hit the "Create" button.

Now, click on the "Quick Start" tab of your Auth0 API page. This page presents instructions on how to set up different APIs. From the code box, choose "Node.js". Keep this page open as you'll be using the values next.

Create a `.env` file for the API Server under the `auth0-express-sample` directory:

```bash
touch .env
```

Populate this `auth0-express-sample/.env` file as follows:

```bash
SERVER_PORT=6060
CLIENT_ORIGIN_URL=http://localhost:4040
AUTH0_AUDIENCE=
AUTH0_ISSUER_URL=
```

Head back to the "Node.js" code snippet from the Auth0 API "Quick Start" page. Locate the definition of `jwtCheck`:

```javascript
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://<TENANT-NAME>.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://express.sample", // 👈 AUTH0_AUDIENCE value
  issuer: "https://<TENANT-NAME>.auth0.com/", // 👈 AUTH0_ISSUER_URL value
  algorithms: ["RS256"],
});
```

Look at the object that the `jwt` function takes as an argument and use the following properties to complete the values of your `.env` file:

The `audience` property is the value of `AUTH0_AUDIENCE`.

The `issuer` property is the value of `AUTH0_ISSUER_URL`.

> Do not include the quotes, only the string value.

With the `.env` configuration values set, run the API server by issuing the following command:
 
```bash
npm start
```