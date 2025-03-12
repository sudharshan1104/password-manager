# Cred Pass

A simple credentials manager built using **MERN Stack**, built only to learn MERN technologies.
Don't save your information yet, this is **under development.**

## Tech details

- Uses MongoDB on cloud **MongoDB Atlas**
- Implemented RESTful **API's** using Express framework in NodeJS.
- React **SPA**, powered by [vite](https://vitejs.dev/) for faster development.

## Features ref to coding

### Authentication

- **User Regitration and User Login**
  - Implemented using **JWT** and DB validations
  - JWT signing and verification is done usinf **Assymetric encryption methodology**.
- **Unlock feature**
  - currently refreshing the vault locks it again.
- **MFA (Multi factor Authentication)**
  - Built using speakeasy module it generates **TOTP** that supports various authenticators like Google Authenticator, Authy, etc.
- **Forgot Password**
  - User can reset their master/Masterpassword after **email verification**
  - Email contains a link which is valid for 10mins.
  - Email is sent using nodemailer and google-apis and OAuth 2.0

### API Features

- All necessary API's are **protected** when user logins the Token is stored for a stipulated amount of time, every request needs the token to let the user in.
- Middlewares are used for this purpose
- Integrated the feature with TOTP.
- All the credentials are stored in a .env file for better security.

### User Settings

- User can Export the vault details into a json file, and **download** the same.
- User can toggle MFA settings.
- User can delete the account or delete his vault items.

### Vault

All the items user wants to save are stored and accessed here, currently only saves credentials of webservices or Apps.

- Supports all the CRUD operations
- **Recyle feature**
  - Items deleted first go to bin and stay for 7 days.
  - Upon completion of 7 days the records get deleted.
  - User within the 7 days period can restore the items.
- **Favorites**
  - User can toggle any of their items to or from favorites.
- **Favicons or websites logos**
  - Each item stored in Vault will have a logo associated with for a better UX.
- **ClipBoard**
  - User can copy the credentials within a click.

### Things under development

- Better Encrytion right from the frontend initiaiton
- Organization or group feature.
- Multiple Items like Cards, personal data, secure notes.
- Payment gateway implementation to lock the featuresvia Stripe or any other Indian platform.

### Direcory Structure

```bash
.
├── README.md
├── server
│   ├── server.js
│   └── src
├── client
│   ├── public
│   └── src
```
