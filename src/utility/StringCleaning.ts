
export function cleanMachine(text: string): string {
    return text.replace("tm", "").replace("hm", "");
}

// FIXME : This should be changed to replaceAll (or regex equivalent)
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
    let nextIsSuffix = false;
    value = value.split('-')
        .map((str) => {
            if (str[0] === undefined) {
                nextIsSuffix = true;
            } else {
                const word = str[0].toUpperCase() + str.substring(1);
                if (nextIsSuffix) return "(" + word + ")";
                return word;
            }
        })
        .join(' ')
        .replace(/\s+/g, " ");
    return value;
}

/**
 * Inverse of dataToCleanString
 * @param value 
 * @returns 
 */
export function cleanStringToData(value: string) {
    value = value.replace(/\s/g, "-")
        .replace("(", "-")
        .replace(")", "")
        .toLowerCase();
    return value;
}