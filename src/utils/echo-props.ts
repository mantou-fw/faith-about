/** Restore an absent property from the readable captured content representation. */
export function restoreProps<T>(value: T): T {
  if (value && typeof value === 'object' && '$astroUndefined' in value) return undefined as T;
  if (Array.isArray(value)) return value.map(restoreProps) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, restoreProps(item)])) as T;
  }
  return value;
}
