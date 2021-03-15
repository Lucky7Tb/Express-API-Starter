async function index(req, res, next) {
	res.send("Hello World!");
}

module.exports = {
	index,
};
