var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
const google = require('googleapis').google;

// Google's OAuth2 client
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');
// Including our config file
const CONFIG = require('../config');

function sessionData(ses,webToken) {
    console.log("handling user granting access");    
    console.log('Start Time: %s, End Time: %s',
        ses.startTimeMillis,
        ses.endTimeMillis
    );
    var sesClient = new Client();
    url = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';
    args = {
        data: { "aggregateBy": { "dataTypeName": "com.google.sleep.segment" }, "endTimeMillis": "1606820460000", "startTimeMillis": "1606795020000" },
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + webToken
        } // request headers
    };
    args2 = {
        data: {
            "aggregateBy": [
                {
                    "dataTypeName": "com.google.sleep.segment"
                }
            ],
            "endTimeMillis": ses.endTimeMillis,
            "startTimeMillis": ses.startTimeMillis
        },
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + webToken
        } // request headers
    };

    console.log('posting to url: ' + url);
    console.log('posting data %j', args.data );
    sesClient.post(url, args,
        function (data, response) {
            // parsed response body as js object
            console.log("Data is:");
            console.log(data);
            // raw response
            //console.log("Response is:");
            //console.log(response);
        }).on('error', function (err) {
            console.log('something went wrong on the request', err.request.options);
        });

    // handling client error events
    sesClient.on('error', function (err) {
        console.error('Something went wrong on the client', err);
    });

}

/* GET data */
router.get('/', function (req, res, next) {
    if (!req.cookies.jwt) {
        // We haven't logged in
        console.error('Not logged in, redirecting to root');
        return res.redirect('/');
    }
    // Create an OAuth2 client object from the credentials in our config file
    const oauth2Client = new OAuth2(
        CONFIG.oauth2Credentials.client_id,
        CONFIG.oauth2Credentials.client_secret,
        CONFIG.oauth2Credentials.redirect_uris[0]);
    // Add this specific user's credentials to our OAuth2 client
    oauth2Client.credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);
    console.log('credentials token is >%j', oauth2Client.credentials);
    webToken = oauth2Client.credentials.access_token;
    refreshToken = oauth2Client.credentials.refresh_token;

    res.render('login_data', { 
        title: 'Save Credentials',
        webToken: webToken, 
        refreshToken: refreshToken
        }
    );
});

module.exports = router;
