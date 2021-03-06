const express = require('express');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const private = require('./private/private.js');

const PORT = process.env.PORT || 8080;
const dbURL = process.env.dbURL || private.dbURL;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(statusCode).json({ message, data });
});

mongoose
    .connect(dbURL)
    .then(result => {
        app.listen(PORT, process.env.IP, () => {
            console.log(`App listening on port ${PORT}.`);
        });
    })
    .catch(err => console.log(err));

