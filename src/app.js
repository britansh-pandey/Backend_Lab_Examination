const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'super_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(routes);

module.exports = app;