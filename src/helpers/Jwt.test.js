const jwtHelper = require("./Jwt");

describe("Test jwt helper", function () {
	let token = null;
	it("Should create a jwt token", function () {
		token = jwtHelper.generateToken(
			{ name: "Test user" },
			process.env.AUTH_TOKEN,
			{
				expiresIn: "1d",
			}
		);
		expect(token).not.toBeNull();
		expect(token).not.toBeUndefined();
		expect(token.split(".").length).toBe(3);
	});

	it("Should success verify the token", function () {
		jwtHelper.verifyToken(
			token,
			process.env.AUTH_TOKEN,
			function (err, payload) {
				expect(payload.name).toBe("Test user");
				expect(err).toBe(null);
			}
		);
	});

	it("Should failed verify the token because token is expired", function () {
		jest.useFakeTimers();
		const expiredToken = jwtHelper.generateToken(
			{ name: "Test user" },
			process.env.AUTH_TOKEN,
			{
				expiresIn: "10s",
			}
		);
		setTimeout(() => {
			jwtHelper.verifyToken(
				expiredToken,
				process.env.AUTH_TOKEN,
				function (err, payload) {
					expect(err).not.toBeNull();
					expect(err.message).toBe("jwt expired");
					expect(payload).toBe(undefined);
				}
			);
		}, 10000);
		jest.runAllTimers();
	});

	it("Should failed verify the token because secret key is wrong", function () {
		jwtHelper.verifyToken(
			token,
			"wrong_secret_key",
			function (err, payload) {
				expect(err).not.toBeNull();
				expect(err.message).toBe("invalid signature");
				expect(payload).toBe(undefined);
			}
		);
	});
});
