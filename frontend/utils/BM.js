function badCharHeuristic(pattern) {
    let badChar = new Array(256).fill(-1);
    for (let i = 0; i < pattern.length; i++) {
        badChar[pattern.charCodeAt(i)] = i;
    }
    return badChar;
}

export function containBM(string, pattern) {
    if (pattern.length === 0) return true;
    if (string.length === 0) return false;

    let badChar = badCharHeuristic(pattern);
    let m = pattern.length;
    let n = string.length;
    let s = 0; // shift of the pattern with respect to string

    while (s <= (n - m)) {
        let j = m - 1;

        // Match the pattern from right to left
        while (j >= 0 && pattern[j] === string[s + j]) {
            j--;
        }
        
        // If the pattern is found
        if (j < 0) {
            return true;
        } else {
            // Shift the pattern so that the bad character in string
            // aligns with the last occurrence of it in the pattern
            // The max function is used to ensure we move at least one step forward
            s += Math.max(1, j - badChar[string.charCodeAt(s + j)]);
        }
    }
    return false;
}
