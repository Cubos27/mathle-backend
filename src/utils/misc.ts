export function toLowerCase ( str : string ) : string {
    return str.toLowerCase();
}

export function toTitleCase ( str : string ) : string {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}