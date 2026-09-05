/**
 * Ensure MongoDB/ObjectId values are usable in API URLs.
 */
export function getId(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value.$oid) return value.$oid;
  if (typeof value === 'object' && value.toString) return value.toString();
  return String(value);
}
