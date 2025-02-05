import { env } from '@/env';

export function api(url: string, options?: RequestInit) {
  const basePath = env.NEXT_PUBLIC_API_BASE_URL;

  const path = new URL('api'.concat(url), basePath);

  return fetch(path, options);
}
