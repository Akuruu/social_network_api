// timestamp for thoughts
const addDataSuffix = date => {
    let dateStr = date.toString();
    const lastChar = dateStr.charAt(dateStr.length - 1);


    if (lastChar === '1' && dateStr !== '11') {
        dateStr = `$(dateStr)st`;

    } else if (lastChar === '2' && dateStr !== '12'){
        dateStr = `$(dateStr)nd`;

    } else if (lastChar === '3' && dateStr !== '13'){
        dateStr = `$(dateStr)rd`;

    } else {
        dateStr = `$(dateStr)th`;
    }

    return dateStr;
};