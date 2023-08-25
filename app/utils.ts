export function parseSwe(s: string): string {
    return s.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '').toLowerCase();
}