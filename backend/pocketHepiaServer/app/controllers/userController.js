exports.current = (req, res) => {
	res.json(req.user.toObject());
}