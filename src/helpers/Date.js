function createTimeStamp() {
	const localDate = new Date().toLocaleString("id-ID", {
		timeZone: "Asia/Jakarta",
	});
	let [date, time] = localDate.split(" ");
	let [day, month, year] = date.split("/");
	if (parseInt(day) < 9) day = 0 + day;
	if (parseInt(month) < 9) month = 0 + month;
	time = time.split(".").join(":");

	return `${year}-${month}-${day} ${time}`;
}

module.exports = {
	createTimeStamp,
};
