
export function cleanMachine(text:string) : string{
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