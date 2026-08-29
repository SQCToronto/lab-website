const base = (import.meta.env?.BASE_URL ?? '/lab-website/').replace(/\/?$/, '/');

export function withBase(path = '/') {
  const clean = path.replace(/^\/+/, '');
  return clean ? `${base}${clean}`.replace(/\/{2,}/g, '/') : base;
}
