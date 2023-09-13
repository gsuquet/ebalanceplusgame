export function generateStringId(length: number = 8): string {
  return Math.random().toString(36).substr(2, length)
}
