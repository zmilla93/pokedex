
export function cleanMachine(text: string): string {
    return text.replace("tm", "").replace("hm", "");
}

export function formatFlavorText(text: string) {
    text = text.replace("\f", " ")
        .replace("-\n", "-")
        .replace("\n", " ")
        .replace("’", "'")
        .replace("，", ",")
        .replace("", "")
        .replace("­", "")
        .replace("　", "");
    return text;
}


export function dataToCleanString(value: string) {
    value = value.replace("-", " ")
        .split(' ')
        .map((str) => str[0].toUpperCase() + str.substring(1))
        .join(' ');
    return value;
}

/**
 * Inverse of dataToCleanString
 * @param value 
 * @returns 
 */
export function cleanStringToData(value: string) {
    value = value.replace(" ", "-").toLowerCase();
    return value;
}