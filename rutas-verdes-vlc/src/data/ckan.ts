const CKAN_BASE = 'https://opendata.vlci.valencia.es';

export async function fetchDatasets(query: string): Promise<
  { title: string; id: string }[]
> {
  try {
    const res = await fetch(
      `${CKAN_BASE}/api/3/action/package_search?q=${encodeURIComponent(query)}&rows=20`
    );
    const json = await res.json();
    return json.result.results.map((d: { title: string; id: string }) => ({
      title: d.title,
      id: d.id,
    }));
  } catch {
    return [];
  }
}

export async function getResourceData(resourceId: string): Promise<unknown> {
  try {
    const res = await fetch(
      `${CKAN_BASE}/api/3/action/resource_show?id=${resourceId}`
    );
    const json = await res.json();
    return json.result;
  } catch {
    return null;
  }
}
