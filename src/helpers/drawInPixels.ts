export function convertValueToPixels(value: number, pixelsPerUnit: number, unit: number): number {
    return (value * pixelsPerUnit) / unit;
}

export function convertPixelsToValue(pixels: number, pixelsPerUnit: number, unit: number): number {
    return (pixels * unit) / pixelsPerUnit;
}

export function convertValuesListToPixelsList(values: number[], pixelsPerUnit: number, unit: number): number[] {
    return values.map((value) => convertValueToPixels(value, pixelsPerUnit, unit));
}
