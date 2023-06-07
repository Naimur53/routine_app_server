// get min class length

function getMinClassLength(classRoutines) {
    let minDuration = Infinity;

    classRoutines.forEach(classItem => {
        const startTime = new Date(classItem.startTime);
        const endTime = new Date(classItem.endTime);
        const duration = endTime - startTime;

        if (duration < minDuration) {
            minDuration = duration;
        }
    });

    // Convert the duration to minutes
    const minDurationInMinutes = new Date(minDuration).toLocaleTimeString()

    return minDurationInMinutes;
}


function sortByDuration(classRoutines) {
    classRoutines.sort((a, b) => {
        const durationA = new Date(a.endTime) - new Date(a.startTime);
        const durationB = new Date(b.endTime) - new Date(b.startTime);
        return durationA - durationB;
    });
}
function textConversion(text, len) {
    if (!text?.length) {
        return ""
    }
    if (text.includes('.') && text.length >= len) {
        const sliptText = text.split('.')
        const sortText = sliptText.map(single => single.toUpperCase().slice(0, 1));
        const main = sortText.join(".")
        if (main.length >= len) {
            return main.split('.').slice(0, len / 2).join('.')
        }
        return main
    }
    if (text.length >= len) {
        const sliptText = text.split(' ')
        if (sliptText.length === 1) {
            return text.slice(0, len - 3) + '...'
        }
        const sortText = sliptText.slice(1, len).map(single => single.toUpperCase().slice(0, 1));
        const mainText = [sliptText[0], ...sortText]
        return textConversion(mainText.join("."), len)
    }
    return text;

}
const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function getUniqueExitDays(classSchedules) {
    const exitDays = [];

    for (const schedule of classSchedules) {
        const day = schedule.day;
        if (!exitDays.includes(day)) {
            exitDays.push(day);
        }
    }

    return exitDays;
}

module.exports = { getMinClassLength, sortByDuration, textConversion, formatAMPM, getUniqueExitDays };