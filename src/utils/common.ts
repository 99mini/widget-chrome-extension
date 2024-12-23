/**
 * @description Add protocol to url if not exists
 * @param url
 * @returns url with protocol
 * @example
 * ```ts
 * urlProtocol('www.google.com'); // => https://www.google.com
 * urlProtocol('http://www.google.com'); // => https://www.google.com
 * urlProtocol('https://www.google.com', 'http); // => http://www.google.com
 * ```
 */
export function urlProtocol(url: string, protocol: 'https' | 'http' = 'https') {
  const matched = url.match(/^(https?:\/\/)/);

  if (matched) {
    return url.replace(matched[1], `${protocol}://`);
  }

  return `${protocol}://${url}`;
}
