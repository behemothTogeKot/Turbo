export const prettifyDate = (date) => {
	const [day, time] = date.split("T");
	const [year, month, dayNumber] = day.split("-");
	const [hours, minutes] = time.split(":");
	return `${dayNumber}/${month}/${year.slice(2)} ${hours}:${minutes}`;
};
