import type { Item } from './api';
import type { NormalizedItems } from './normalize';

export function selectAllItems(normalized: NormalizedItems): Item[] {
  return normalized.allIds.map((id) => normalized.byId[id]).filter(Boolean);
}

export function selectOpenItems(normalized: NormalizedItems): Item[] {
  return selectAllItems(normalized).filter((item) => item.status === 'open');
}

export function selectClosedItems(normalized: NormalizedItems): Item[] {
  return selectAllItems(normalized).filter((item) => item.status === 'closed');
}
