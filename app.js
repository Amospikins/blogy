const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const postsRoute = require('./routes/post');

app.use(bodyParser.json());
app.use("/posts", postsRoute);

module.exports = app