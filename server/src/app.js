const express = require("express");
const cors = require('cors');

const LocationRouter = require('./location/LocationRouter');
const BookRouter = require('./book/BookRouter');
const ErrorHandler = require('./error/ErrorHandler');

const app = express();
app.use(cors());

app.use(express.json());

app.use(LocationRouter);
app.use(BookRouter);

app.use(ErrorHandler);

module.exports = app;