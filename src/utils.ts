export function replaceInString(str: string, start: number, end: number, replacement?: string): string{
    replacement = replacement || '';
    return `${str.substring(0, start)}${replacement}${str.substring(end)}`
}