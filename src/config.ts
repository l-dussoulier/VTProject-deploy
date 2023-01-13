'use strict'
import { config } from "dotenv";
import assert from "assert";

config();

const {
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    //PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,

    TYPE,
    PROJECT_ID,
    PRIVATE_KEY_ID,
    PRIVATE_KEY,
    CLIENT_EMAIL,
    CLIENT_ID,
    AUTH_URI,
    TOKEN_URI,
    AUTH_PROVIDER_X509_CERT_URL,
    CLIENT_X509_CERT_URL

} = process.env;

assert(PORT,'PORT is required');
assert(HOST,'HOST is required');

export default {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
        type : TYPE,
        project_id : PROJECT_ID,
        private_key_id : PRIVATE_KEY_ID,
        private_key : PRIVATE_KEY,
        client_email : CLIENT_EMAIL,
        client_id : CLIENT_ID,
        auth_uri : AUTH_URI,
        token_uri: TOKEN_URI,
        auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: CLIENT_X509_CERT_URL
    }
}
