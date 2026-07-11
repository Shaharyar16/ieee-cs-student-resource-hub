// Thin localStorage wrapper used to persist form submissions in the prototype.
// A real backend would replace these calls with API requests.

export function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T[];
  } catch {
    return fallback;
  }
}

export function appendToStorage<T>(key: string, fallback: T[], item: T): T[] {
  const current = loadFromStorage<T>(key, fallback);
  const updated = [item, ...current];
  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
}

export function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

/** Read a single JSON value (object or array) from storage. */
export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Persist a single JSON value. Throws on quota errors so callers can react. */
export function writeJSON<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
