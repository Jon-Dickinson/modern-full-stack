export type ItemStatus = 'open' | 'closed';

export type Item = {
  id: string;
  title: string;
  status: ItemStatus;
  createdAt: string;
  updatedAt: string;
};

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('Missing NEXT_PUBLIC_API_BASE_URL in frontend/.env.local');
  }
  return baseUrl;
}

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch(`${getApiBaseUrl()}/items`);

  if (!response.ok) {
    throw new Error(`Failed to fetch items: ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();
  // Keep runtime checks minimal (we validate on backend). Assume correct shape.
  return data as Item[];
}
