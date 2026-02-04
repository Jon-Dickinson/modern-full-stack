import React, { useEffect, useMemo, useState } from 'react';
import ItemList from '../components/ItemList';
import { fetchItems, type Item } from '../lib/api';
import { normalizeItems } from '../lib/normalize';
import { toItemListModel } from '../lib/uiModel';

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const fetchedItems = await fetchItems();

        if (!isCancelled) {
          setItems(fetchedItems);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        if (!isCancelled) {
          setErrorMessage(message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, []);

  const model = useMemo(() => {
    const normalized = normalizeItems(items);
    return toItemListModel(normalized);
  }, [items]);

  if (isLoading) {
    return <div style={{ maxWidth: 820, margin: '40px auto', padding: 20 }}>Loading…</div>;
  }

  if (errorMessage) {
    return (
      <div style={{ maxWidth: 820, margin: '40px auto', padding: 20 }}>
        <h1>Items</h1>
        <p style={{ color: 'crimson' }}>{errorMessage}</p>
        <p>Check that the backend is running on port 3002 and NEXT_PUBLIC_API_BASE_URL is set.</p>
      </div>
    );
  }

  return <ItemList model={model} />;
}
