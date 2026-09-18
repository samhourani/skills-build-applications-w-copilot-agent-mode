export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function buildApiUrl(resource) {
  return `${getApiBaseUrl()}/api/${resource}/`;
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const nestedCandidates = [
    payload.data,
    payload.results,
    payload.items,
    payload.records,
    payload.docs,
    payload.data?.data,
    payload.data?.results,
    payload.data?.items,
    payload.data?.records,
  ];

  for (const candidate of nestedCandidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
}

export async function fetchCollection(resource) {
  const response = await fetch(buildApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Unable to load ${resource} data.`);
  }

  const payload = await response.json();
  return normalizeCollectionResponse(payload);
}
