async function index(req, res, next) {
	res.send("Hello world");
}

module.exports = {
	index,
};
