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

/**
 * @description Validate email
 * @param email
 * @returns true if email is valid
 */
export function validateEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * @description Validate url
 * @param url
 * @returns true if url is valid
 * @example
 * ```ts
 * validateUrl('https://www.google.com'); // => true
 * validateUrl('www.google.com'); // => true
 * validateUrl('google.com'); // => true
 * validateUrl('googlecom'); // => false
 * ```
 */
export function validateUrl(url: string): boolean {
  const withProtocol = urlProtocol(url);
  return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(withProtocol);
}
