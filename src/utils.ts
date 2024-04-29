export function getUUID() {
  if (crypto && crypto.randomUUID) { return crypto.randomUUID() }
  return URL.createObjectURL(new Blob(['1'])).split('/').pop()!
}
