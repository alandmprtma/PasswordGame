function computeLPSArray(pattern) {
    let lps = new Array(pattern.length).fill(0);
    let length = 0;
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

export function containKMP(string, pattern) {
    if (pattern.length === 0) return true;
    if (string.length === 0) return false;

    let lps = computeLPSArray(pattern);
    let i = 0; // index for string
    let j = 0; // index for pattern

    while (i < string.length) {
        if (pattern[j] === string[i]) {
            i++;
            j++;
        }
        if (j === pattern.length) {
            return true;
        } else if (i < string.length && pattern[j] !== string[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return false;
}
