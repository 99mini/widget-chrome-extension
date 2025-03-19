export function deepMerge<T>(origin: T, newObject: Partial<T>): T {
  const result: T = structuredClone(origin);

  for (const key in newObject) {
    const originValue = origin[key];
    const newValue = newObject[key];

    if (typeof originValue === 'object' && typeof newValue === 'object') {
      result[key] = deepMerge(originValue, newValue);
    } else {
      if (newValue) {
        result[key] = newValue;
      }
    }
  }

  return result;
}
