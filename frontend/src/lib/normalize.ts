import type { Item } from './api';

export type NormalizedItems = {
  byId: Record<string, Item>;
  allIds: string[];
};

export function normalizeItems(items: Item[]): NormalizedItems {
  const byId: Record<string, Item> = {};
  const allIds: string[] = [];

  for (const item of items) {
    byId[item.id] = item;
    allIds.push(item.id);
  }

  return { byId, allIds };
}
