const dateHelper = require("./Date");
describe("Test date helper", function() {
	it("Should return the date time of now time zone Asia/Jakarta", function() {
		const localDate = new Date().toLocaleString("id-ID", {
			timeZone: "Asia/Jakarta",
		});
		let [date, time] = localDate.split(" ");
		let [day, month, year] = date.split("/");
		if (parseInt(day) < 9) day = 0 + day;
		if (parseInt(month) < 9) month = 0 + month;
		time = time.split(".").join(":");

		const dateTimeNow = dateHelper.createTimeStamp();
		expect(dateTimeNow).toBe(`${year}-${month}-${day} ${time}`);
		expect(dateTimeNow).not.toBeNull();
		expect(dateTimeNow).not.toBeUndefined();
		expect(dateTimeNow).not.toBeUndefined();
		expect(dateTimeNow).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
	});
});
