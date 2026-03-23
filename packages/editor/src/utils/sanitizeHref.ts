/**
 * href 값을 검증하여 http:/https: 프로토콜만 허용한다.
 * javascript:, data: 등 위험한 프로토콜은 undefined를 반환한다.
 */
export const sanitizeHref = (href: string | null | undefined): string | undefined => {
  if (!href) return undefined;

  try {
    const url = new URL(href);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return url.toString();
    }
  } catch {
    return undefined;
  }

  return undefined;
};
