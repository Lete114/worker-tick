export function getUUID() {
  if (crypto) { return crypto.randomUUID() }
  return URL.createObjectURL(new Blob(['1'])).split('/').pop()!
}
