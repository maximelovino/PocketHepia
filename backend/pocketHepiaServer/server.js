const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const passport = require('passport');
const https = require('https');
const fs = require('fs');
dotenv.config({ path: './conf/conf.env' });

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
	console.log("Mongo Connection worked");
}).catch(e => {
	console.error("There was a problem");
	console.error(e);
});

mongoose.Promise = global.Promise;

require('./app/models/User');
require('./app/models/Log');

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(passport.initialize());
require('./app/handlers/passport');

const routes = require('./app/routes/index');

app.use("/", routes);

const httpsOptions = {
	key: fs.readFileSync('../../certs/server.key'),
	cert: fs.readFileSync('../../certs/server.crt')
}

// TODO dev purposes
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// TODO add http listen as well for Android dev
https.createServer(httpsOptions, app).listen(8080, () => {
	console.log("Server listening on https://localhost:8080");
});

