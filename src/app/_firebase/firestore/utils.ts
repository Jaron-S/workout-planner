export function encodeFirebaseKey(key: string) {
  return key.replace(
    /[%.\#$/\[\]]/g,
    (char) => "%" + char.charCodeAt(0).toString(16)
  );
}