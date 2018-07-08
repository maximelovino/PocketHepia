const express = require('express');
const router = express.Router();

const getName = (req, res, next) => {
	req.name = req.body.name;
	next()
}

const helloFunction = (req, res) => {
	if (req.name === "Mickael") {
		res.status(404);
		res.send("No no, name not here");
		return;
	}
	res.status(200);
	res.send(`Hello ${req.name}`)
}

router.post("/hello", getName, helloFunction);

module.exports = router;