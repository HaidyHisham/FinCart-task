export const loadState = <T = unknown>(key: string): T | undefined => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : undefined;
    } catch {
        return undefined;
    }
};

export const saveState = (key: string, state: unknown) => {
    try {
        localStorage.setItem(key, JSON.stringify(state));
    } catch {
        // ignore write errors (quota/private mode)
    }
};
