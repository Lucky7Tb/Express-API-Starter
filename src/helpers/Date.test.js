const dateHelper = require("./Date");
describe("Test date helper", function() {
	it("Should return the date time of now", function() {
		const dateTimeNow = dateHelper.createTimeStamp();
		expect(dateTimeNow).not.toBeNull();
		expect(dateTimeNow).not.toBeUndefined();
		expect(dateTimeNow).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
	});
});
