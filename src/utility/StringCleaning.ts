
export function cleanMachine(text:string) : string{
    return text.replace("tm", "").replace("hm", "");
}