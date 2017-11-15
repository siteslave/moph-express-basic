'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const jwt_1 = require("./models/jwt");
const jwt = new jwt_1.Jwt();
const index_1 = require("./routes/index");
const login_1 = require("./routes/login");
const api_1 = require("./routes/api");
const session = require('express-session');
const Knex = require("knex");
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
const connection = {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};
const db = Knex({
    client: 'mysql',
    connection: connection,
    debug: true
});
app.use((req, res, next) => {
    req.db = db;
    next();
});
app.use(session({
    secret: 'testsession0011122233',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
var auth = (req, res, next) => {
    if (req.session.logged) {
        next();
    }
    else {
        res.redirect('/login');
    }
};
var authApi = (req, res, next) => {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.query && req.query.token) {
        token = req.query.token;
    }
    else if (req.body && req.body.toke) {
        token = req.body.token;
    }
    else {
        token = req.body.token;
    }
    jwt.verify(token)
        .then((decoded) => {
        req.decoded = decoded;
        next();
    })
        .catch((error) => {
        return res.send({ ok: false, error: 'No token!' });
    });
};
app.use('/api', authApi, api_1.default);
app.use('/login', login_1.default);
app.use('/', auth, index_1.default);
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
if (process.env.NODE_ENV === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.send({
            title: 'error',
            message: err.message,
            error: err
        });
    });
}
app.use((err, req, res, next) => {
    res.status(err['status'] || 500);
    res.send({
        title: 'error',
        message: err.message,
        error: {}
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map