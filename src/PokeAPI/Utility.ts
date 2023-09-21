

export function getMachineIdFromURL(url: string): number {
    let id = url.replace(/.*\/machine\//i, "");
    id = id.replace("/", "");
    return parseInt(id);
}