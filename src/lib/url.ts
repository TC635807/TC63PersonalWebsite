/**
 * 站内链接的统一出口。
 *
 * 站点可能部署在子路径下（例如 https://knowledgediver.cloud/tc63/），
 * 这时 html 里所有**以 / 开头的绝对链接**都必须带上 base，否则会打到域名根上的另一个应用。
 * BASE 来自 astro.config.mjs 的 base：根部署是 '/'，子路径部署是 '/tc63/'。
 *
 * 用法：<a href={url('/projects/')}>、<img src={url(p.cover.src)} />
 */

export const BASE = import.meta.env.BASE_URL;
const ROOT = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;

export function url(path = '/'): string {
  const p = path.startsWith('/') ? path : '/' + path;
  return ROOT + p;
}
