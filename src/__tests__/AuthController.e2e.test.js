const app = require("../../app");
const supertest = require("supertest");
const knex = require("../config/knex");
let http = null;

beforeAll(function () {
	http = supertest(app);
});

describe("Test Auth Endpoint", function () {
	describe("POST /api/auth/register", function () {
		it("Should success register the user", async function () {
			const response = await http
				.post("/api/auth/register")
				.send({
					name: "Tes user",
					email: "user1@mail.com",
					password: "password123",
					password_confirm: "password123",
				})
				.expect(201)
				.expect("Content-Type", "application/json; charset=utf-8");

			expect(response.body.statusCode).toBe(201);
			expect(response.body.message).toBe("Success register");
		});

		it("Should failed register the user because email is already exist", async function () {
			const response = await http
				.post("/api/auth/register")
				.send({
					name: "Tes user",
					email: "user1@mail.com",
					password: "password123",
					password_confirm: "password123",
				})
				.expect(400)
				.expect("Content-Type", "application/json; charset=utf-8");

			expect(response.body.statusCode).toBe(400);
			expect(response.body.message).toBe("Email already in use");
		});

		it("Should failed register the user because 'password_confirm' is not same with password", async function () {
			const response = await http
				.post("/api/auth/register")
				.send({
					name: "Tes user",
					email: "user1@mail.com",
					password: "password123",
					password_confirm: "password1234",
				})
				.expect(400)
				.expect("Content-Type", "application/json; charset=utf-8");

			expect(response.body.statusCode).toBe(400);
			expect(response.body.message).toBe("Password not match");
		});
	});

	describe("POST /api/auth/login", function () {
		it("Should success login the user", async function () {
			const response = await http
				.post("/api/auth/login")
				.send({
					email: "user1@mail.com",
					password: "password123",
				})
				.expect(200)
				.expect("Content-Type", "application/json; charset=utf-8");

			expect(response.body.statusCode).toBe(200);
			expect(response.body.message).toBe("Success login");
			expect(response.body.data).not.toBeNull();
			expect(response.body.data.token).not.toBeNull();
		});

		it("Should failed login the user because email is wrong", async function () {
			const response = await http
				.post("/api/auth/login")
				.send({
					email: "wrongemail@mail.com",
					password: "password123",
				})
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");

			expect(response.body.statusCode).toBe(404);
			expect(response.body.message).toBe("Account not found");
		});

		it("Should failed login the user because password is wrong", async function () {
			const response = await http
				.post("/api/auth/login")
				.send({
					email: "user1@mail.com",
					password: "wrongpassword",
				})
				.expect(404)
				.expect("Content-Type", "application/json; charset=utf-8");

			expect(response.body.statusCode).toBe(404);
			expect(response.body.message).toBe("Account not found");
		});
	});
});

afterAll(async function () {
	await knex("users").truncate();
});
