const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const routes = require('./app/routes/index');

app.use("/", routes);

app.listen(8080, () => console.log("Listening on 8080"));