const express = require("express");
const path = require("path");
const logger = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

const api = require("./src/routes/api");

app.use(helmet());
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", api);

app.use(function (_, res, next) {
	const error = new Error("Not found");
	res.status(404);
	next(error);
});

app.use(function (error, _, res, __) {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	const response = {
		statusCode,
		message: error.message,
	};
	if (process.env.NODE_ENV === "development") response.stack = error.stack;
	res.status(statusCode).json(response);
});

module.exports = app;
