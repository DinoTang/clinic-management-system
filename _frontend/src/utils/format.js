const locale = import.meta.env.VITE_LOCALE;

function formatDateToText(date){

	let newDate = new Date(date);
    let time = newDate.toLocaleTimeString(locale ?? 'vi-VN');

    let dateStr = newDate.toLocaleDateString(locale ?? 'vi-VN', {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });
    let formated = `${time} ${dateStr}`;
	return formated;
}

export default formatDateToText;