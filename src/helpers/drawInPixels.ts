export function convertValueToPixels(value: number, pixelsPerUnit: number, unit: number): number {
  const pixels = (value * pixelsPerUnit) / unit
  return pixels
}

export function convertPixelsToValue(pixels: number, pixelsPerUnit: number, unit: number): number {
  return (pixels * unit) / pixelsPerUnit
}

export function convertValuesListToPixelsList(values: number[], pixelsPerUnit: number, unit: number): number[] {
  const valuesInPixels: number[] = []
  for (let i = 0; i < values.length; i++)
    valuesInPixels.push(convertValueToPixels(values[i], pixelsPerUnit, unit))

  return valuesInPixels
}
