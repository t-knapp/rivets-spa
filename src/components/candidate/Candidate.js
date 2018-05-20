export function revertA(str) {
    if(!str)
        return '';
    let array = str.split("");
    let reversed = array.reverse();
    return reversed.join('');
}

export function revertB(str) {
    if(!str)
        return '';
    let i, length = str.length, value = [];
    for(i = 0; i < length; i++) {
        value.unshift(str[i]);
    }
    return value.join('');
}