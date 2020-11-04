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
REACT_APP_ADMIN_ROLE=messages-admin
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

Create a `.env` file for the API Server under the `auth0-express-js-sample` directory:

```bash
touch .env
```

Populate this `auth0-express-js-sample/.env` file as follows:

```bash
SERVER_PORT=6060
CLIENT_ORIGIN_URL=http://localhost:4040
AUTH0_AUDIENCE=
AUTH0_DOMAIN=
```

Head back to your Auth0 API page, and **follow these steps to get the Auth0 Audience**:

![Get the Auth0 Audience to configure an API](https://cdn.auth0.com/blog/complete-guide-to-user-authentication/get-the-auth0-audience.png)

1. Click on the ** "Settings"** tab.

2. Locate the ** "Identifier"** field and copy its value.

3. Paste the "Identifier" value as the value of `AUTH0_AUDIENCE` in `.env`.

Now, **follow these steps to get the Auth0 Domain value**:

1. Click on the ** "Test"** tab.
2. Locate the section called **" Asking Auth0 for tokens from my application"**.
3. Click on the **cURL** tab to show a mock `POST` request.
4. Copy your Auth0 domain, which is _part_ of the `--url` parameter value: `tenant-name.region.auth0.com`.
5. Paste the Auth0 domain value as the value of `AUTH0_DOMAIN` in `.env`.

> **Tips to get the Auth0 Domain**
> - The Auth0 Domain is the substring between the protocol, `https://` and the path `/oauth/token`.
> - The Auth0 Domain follows this pattern: `tenant-name.region.auth0.com`.
> - The `region` subdomain (`au`, `us`, or `eu`) is optional. Some Auth0 Domains don't have it.

With the `.env` configuration values set, run the API server by issuing the following command:

```bash
npm start
```

## Create Permissions 

Head to the ["APIs" section](https://manage.auth0.com/#/apis) of the Auth0 Dashboard.

Select the API registration for which you want to create permissions.

Once the API page loads up, click on the "Permissions" tab.

Locate the **"Add a Permission (Scope)"** section and fill out the "Permission/Description" row as follows:

- Permission (Scope): `read:admin-messages`
- Description: Read admin messages

Then, click on the "+ Add" button.

Now, you need to enforce Role-Based Access Control (RBAC) policies for the API. 

Click on the "Settings" tab of the API page.

Scroll down to the "RBAC Settings" section and click on the "Enable RBAC" switch. The status of the switch should say "Enabled" with a green background color.

Do the same to enable the "Add Permissions in the Access Token" option, which allows Auth0 to add the `permissions` claim to your access tokens.

Scroll down and click the "Save" button.

## Set Up User Roles with Auth0

Head to the ["Roles" section](https://manage.auth0.com/#/roles) of the Auth0 Dashboard.

Click on the "Create Role" button.

Fill out the form that comes up as follows:

- Name: `messages-admin`

- Description: Access admin messaging features

The page for the `messages-admin` role loads up.

Click on the "Permissions" tab.

Then, click on the "Add Permissions" button.
 
Using the dropdown from the modal that comes up, choose the API for which you created the permission earlier.

Next, select the `read:admin-messages` and click on the "Add Permissions" button.

Now, you need to assign the `messages-admin` role to a user.

Head to the ["Users" section](https://manage.auth0.com/#/users) of the Auth0 Dashboard.

Click on any user to which you want to assign the role.

Once the user's page loads up, click on the "Roles" tab.

Then, click on the "Assign Roles" button.

Choose the role that you created earlier and click on the "Assign" button.

## Create an Auth0 Rule to Add Roles to Tokens

Head to the ["Rules" section](https://manage.auth0.com/#/rules) of the Auth0 Dashboard.

Click on the "Create Rule" button and then click on the "Empty Rule" option.

In the form that comes up, set the **Name** field as "Token Roles".

Then, copy and paste the following code as the value for the **Script** section:

```javascript
function(user, context, callback) {
  const namespace = 'https://nestjs.example.com';

  if (context.authorization && context.authorization.roles) {
    const assignedRoles = context.authorization.roles;

    if (context.idToken) {
      const idTokenClaims = context.idToken;
      idTokenClaims[`${namespace}/roles`] = assignedRoles;
      context.idToken = idTokenClaims;
    }

    if (context.accessToken) {
      const accessTokenClaims = context.accessToken;
      accessTokenClaims[`${namespace}/roles`] = assignedRoles;
      context.accessToken = accessTokenClaims;
    }
  }

  callback(null, user, context);
}
```
Finally, click the "Save Changes" button located at the bottom of the form.

This rule will kick in whenever a user logs in, adding the existing user roles to the ID and access tokens.