export function getMachineIdFromURL(url: string): number {
    let id = url.replace(/.*\/machine\//i, "");
    id = id.replace("/", "");
    return parseInt(id);
}

/**
 * Replaces dashes with spaces, then capitalizes the first letter of each word.
 * @param text 
 * @returns Cleaned String
 */
export function cleanString(text: string): string {
    text = text.replace("-", " ")
        .split(' ')
        .map((str) => str[0].toUpperCase() + str.substring(1))
        .join(' ');
    return text;
}

/**
 * Capitalizes the first letter of a word
 * @param text 
 * @returns 
 */
export function upperFirst(text: string) {
    return text[0].toUpperCase() + text.substring(1);
}