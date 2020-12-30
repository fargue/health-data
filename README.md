# Health Data API

Node Express project to pull data from Google Fit and store in local db.

Google Project Name: HealthHistory

## Install
```
npx express-generator --view=pub
npm install
npm install cookie-parser ejs express google-auth-library googleapis jsonwebtoken node-rest-client
DEBUG=health-data:* npm start
```

## Links

* [Express Getting Started](https://expressjs.com/en/starter/installing.html)
* [Google Oauth](https://dev.to/aidanlovelace/how-to-setup-google-oauth2-login-with-express-2d30)