import { useCallback, useSyncExternalStore } from 'react';
import { readCollection, writeCollection, subscribeCollection } from '@/services/store';

export interface CollectionApi<T> {
  items: T[];
  /** Insert a new item at the top. */
  add: (item: T) => void;
  /** Merge a patch into the item with this id. */
  update: (id: string, patch: Partial<T>) => void;
  /** Update if the id exists, otherwise insert at the top. */
  upsert: (item: T) => void;
  remove: (id: string) => void;
  /** Replace the whole collection (used for reordering). */
  setAll: (items: T[]) => void;
}

/**
 * Reactive access to a persistent collection. Any component using the same key
 * re-renders when the data changes — so an admin edit is instantly reflected on
 * the public site. Pass a module-level `seed` (stable reference).
 */
export function useCollection<T extends { id: string }>(key: string, seed: T[]): CollectionApi<T> {
  const items = useSyncExternalStore(
    useCallback((cb) => subscribeCollection(key, cb), [key]),
    useCallback(() => readCollection<T>(key, seed), [key, seed])
  );

  const add = useCallback((item: T) => writeCollection(key, [item, ...readCollection<T>(key, seed)]), [key, seed]);

  const update = useCallback(
    (id: string, patch: Partial<T>) =>
      writeCollection(key, readCollection<T>(key, seed).map((i) => (i.id === id ? { ...i, ...patch } : i))),
    [key, seed]
  );

  const upsert = useCallback(
    (item: T) => {
      const current = readCollection<T>(key, seed);
      const next = current.some((i) => i.id === item.id)
        ? current.map((i) => (i.id === item.id ? item : i))
        : [item, ...current];
      writeCollection(key, next);
    },
    [key, seed]
  );

  const remove = useCallback((id: string) => writeCollection(key, readCollection<T>(key, seed).filter((i) => i.id !== id)), [key, seed]);

  const setAll = useCallback((next: T[]) => writeCollection(key, next), [key]);

  return { items, add, update, upsert, remove, setAll };
}

/** Reactive [value, setValue] for collections without an `id` (e.g. hierarchy terms). */
export function useStore<T>(key: string, seed: T[]): [T[], (next: T[]) => void] {
  const value = useSyncExternalStore(
    useCallback((cb) => subscribeCollection(key, cb), [key]),
    useCallback(() => readCollection<T>(key, seed), [key, seed])
  );
  const setValue = useCallback((next: T[]) => writeCollection(key, next), [key]);
  return [value, setValue];
}
