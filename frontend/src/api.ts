const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5000';

async function getJSON(path: string) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json();
}

export async function fetchProducts() {
  const data = await getJSON('/api/products');
  if (Array.isArray(data)) {
    return data.map((p: any) => ({ ...p, id: p.id ?? p._id }));
  }
  return data;
}

export async function fetchProductBySlug(slug: string) {
  const data = await getJSON(`/api/products/${encodeURIComponent(slug)}`);
  if (data && typeof data === 'object') return { ...data, id: data.id ?? data._id };
  return data;
}

export async function fetchCategories() {
  return getJSON('/api/categories');
}

export async function fetchRates() {
  return getJSON('/api/rates');
}

export default { fetchProducts, fetchProductBySlug, fetchCategories, fetchRates };
