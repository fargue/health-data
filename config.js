const port = 3002;
const baseURL = `http://localhost:${port}`;
module.exports = {
    // The secret for the encryption of the jsonwebtoken
    JWTsecret: 'mysecret',
    baseURL: baseURL,
    port: port,
    // The credentials and information for OAuth2
    oauth2Credentials: {
        client_id: "287562277113-h366d7q3c9jq4jmvt16hd8vaa7stvk71.apps.googleusercontent.com",
        project_id: "HealthData1", // The name of your project
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "v0SQ2CMTatlz0Fagv48Pl2eh",
        redirect_uris: [
            `${baseURL}/auth_callback`
        ],
        scopes: [
            'https://www.googleapis.com/auth/fitness.sleep.read'
        ]
    }
};