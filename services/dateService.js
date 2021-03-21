
function getDay(date) {
    const d = new Date(date);
    const dayNumber = d.getDay();
    return getDayName(dayNumber);

}

function getDayName(day) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day];
}