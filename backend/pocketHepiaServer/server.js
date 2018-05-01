const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.config({ path: './conf/conf.env' });

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
	console.log("Mongo Connection worked");
}).catch(e => {
	console.error("There was a problem");
	console.error(e);
})

require('./app/models/User');

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(passport.initialize());
require('./app/handlers/passport');

const routes = require('./app/routes/index');

app.use("/", routes);

app.listen(8080, () => {
	console.log("Server listening on http://localhost:8080");
});

