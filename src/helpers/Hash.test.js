const hashHelper = require("./Hash");

describe("Test hash helper", function () {
	it("Should create a hash string password", async function () {
		const plainPassword = "mypassword123";
		const hashPassword = await hashHelper.hashPassword(plainPassword);

		expect(hashPassword).not.toBeNull();
		expect(hashPassword).not.toBeUndefined();
	});

	it("Should success verify the password", async function () {
		const plainPassword = "mypassword123";
		const hashPassword = await hashHelper.hashPassword(plainPassword);

		const isMatch = await hashHelper.verifyPassword(plainPassword, hashPassword);
		expect(isMatch).toEqual(true);
	});

	it("Should failed verify the password", async function () {
		const plainPassword = "mypassword123";
		const hashPassword = await hashHelper.hashPassword(plainPassword);

		const isNotMatch = await hashHelper.verifyPassword("wrongpassword", hashPassword);
		expect(isNotMatch).toEqual(false);
	});
});
