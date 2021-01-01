var express = require('express');
var router = express.Router();
const google = require('googleapis').google;
// Google's OAuth2 client
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');

// Including our config file
const CONFIG = require('../config');

router.get('/', function (req, res, next) {
    // Create an OAuth2 client object from the credentials in our config file
    const oauth2Client = new OAuth2(
        CONFIG.oauth2Credentials.client_id,
        CONFIG.oauth2Credentials.client_secret,
        CONFIG.oauth2Credentials.redirect_uris[0]
        );
    if (req.query.error) {
        // The user did not give us permission.
        return res.redirect('/');
    } else {
        oauth2Client.getToken(req.query.code, function (err, token) {
            if (err)
                return res.redirect('/');
            console.log('token is >%j', token);
            // Store the refresh token in the database for the user
            refreshToken = token.refreshToken;
            
            // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
            var webToken = jwt.sign(token, CONFIG.JWTsecret);
            console.log("google token is >" + webToken + "<");
            res.cookie('jwt', webToken);
            return res.redirect('/handle_login');
        });
    }
});

module.exports = router;