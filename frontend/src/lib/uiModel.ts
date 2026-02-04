import type { NormalizedItems } from './normalize';
import { selectAllItems, selectOpenItems } from './selectors';

export type ItemListRow = {
  id: string;
  title: string;
  badgeText: 'OPEN' | 'CLOSED';
  createdLabel: string;
};

export type ItemListModel = {
  rows: ItemListRow[];
  totalCount: number;
  openCount: number;
};

function formatDateLabel(isoDate: string): string {
  // Keep it simple and consistent across browsers:
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'Unknown date';
  return date.toLocaleString();
}

export function toItemListModel(normalized: NormalizedItems): ItemListModel {
  const allItems = selectAllItems(normalized);
  const openItems = selectOpenItems(normalized);

  const rows: ItemListRow[] = allItems.map((item) => {
    return {
      id: item.id,
      title: item.title,
      badgeText: item.status === 'open' ? 'OPEN' : 'CLOSED',
      createdLabel: formatDateLabel(item.createdAt)
    };
  });

  return {
    rows,
    totalCount: allItems.length,
    openCount: openItems.length
  };
}
