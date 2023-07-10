export function spaceToHyphen(text?: string) {
  if (text) return text.replace(/\s+/g, '-').toLowerCase();
  return null;
}
